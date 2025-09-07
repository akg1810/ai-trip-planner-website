import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { GetPlaceDetails } from '/src/service/GlobalApi';

const PlaceCardItem = ({place}) => {
    const buildPhotoUrl = (photoName, maxWidth = 1500) => {
            const key = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
            return `https://places.googleapis.com/v1/${photoName}/media?key=${key}&maxHeightPx=${maxWidth}&maxWidthPx=${maxWidth}`;
        };
    
        const [photoUrl, setPhotoUrl] = useState();
    
        useEffect(() => {
            place && GetPlacePhoto();
        }, [place])
    
        const GetPlacePhoto = async () => {
            const data = {
                textQuery: place.placeName
            }
            const result = await GetPlaceDetails(data).then(resp => {
                console.log(resp.data)
                const photoName = resp.data.places[0].photos[0].name;
                const url = buildPhotoUrl(photoName);
                setPhotoUrl(url);
            })
        }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='w-[150px] h-[150px] rounded-xl object-cover'/>
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
            <h2 className='mt-2'>⏰ {place.timeTravel}</h2>
            
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem