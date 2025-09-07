import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '/src/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from '../Components/InfoSection';
import Hotels from '../Components/Hotels';
import PlacesToVisit from '../Components/PlacesToVisit';
import Footer from '../Components/Footer';

const ViewTrip = () => {

  const {tripId}=useParams();
  const [trip, setTrip] = useState([]);

  useEffect(()=>{
    tripId&&getTripData();
  }, [tripId]);

  const getTripData=async()=>{
    const docRef=doc(db,'AiTrips',tripId);
    const docSnap=await getDoc(docRef);
    if(docSnap.exists()){
        console.log("Document", docSnap.data());
        setTrip(docSnap.data());
    }
    else{
        console.log("No such document");
        toast("No trip found");
    }
  }

  return (
    <div >
        {/* Information Section */}
        <InfoSection trip={trip}/>
        {/* Recommended Hotels */}
        <Hotels trip={trip}/>
        {/* Itinerary */}
        <PlacesToVisit trip={trip}/>
        {/* Footer */}
        <Footer trip={trip}/>
    </div>
  )
}

export default ViewTrip