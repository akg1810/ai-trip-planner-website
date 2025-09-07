import React from 'react'
import { useState, useEffect } from 'react';
import { GetPlaceDetails } from '/src/service/GlobalApi';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({trip}) => {

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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='object-cover rounded-xl h-[250px] w-full'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem