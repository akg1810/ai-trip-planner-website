import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { db } from '../service/FirebaseConfig';
import UserTripCardItem from './Components/UserTripCardItem';

const MyTrips = () => {

    const [userTrips, setUserTrips] = useState([]);
    const navigation=useNavigation();
    useEffect(()=>{
        getUserTrips();
    }, [])

    const getUserTrips=async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        
        if(!user)
        {
            navigation('/');
            return;
        }

        
        const q=query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email));

        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal=>[...prevVal, doc.data()])
        });
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 flex flex-col'>
        <h2 className='font-bold text-3xl mx-30'>My Trips</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 mt-10 gap-5 mx-30'>
            {userTrips?.length>0?userTrips.map((trip,index)=>(
                <UserTripCardItem trip={trip} key={index}/>
            ))
        :[1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
        ))
        }
        </div>
    </div>
  )
}

export default MyTrips