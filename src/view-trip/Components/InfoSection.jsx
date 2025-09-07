import { GetPlaceDetails } from '/src/service/GlobalApi';
import { Button } from '/src/components/ui/button'
import React, { useEffect, useState } from 'react'
import { IoShareSocialSharp } from "react-icons/io5";

const InfoSection = ({trip}) => {

  const buildPhotoUrl = (photoName, maxWidth = 1500) => {
    const key = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
    return `https://places.googleapis.com/v1/${photoName}/media?key=${key}&maxHeightPx=${maxWidth}&maxWidthPx=${maxWidth}`;
  };

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data)
      const photoName = resp.data.places[0].photos[0].name; 
      const url = buildPhotoUrl(photoName);
      setPhotoUrl(url);
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='h-[300px] w-full object-cover rounded-xl'/>

        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📅 {trip.userSelection?.noOfDays} Day</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰 {trip.userSelection?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🥂 No. of Traveler: {trip.userSelection?.traveler} Day</h2>
            </div>
        </div>
        <Button><IoShareSocialSharp /></Button>
        </div>
        
    </div>
  )
}

export default InfoSection