import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { GetPlaceDetails } from '/src/service/GlobalApi';

const HotelCardItem = ({hotel}) => {

    const buildPhotoUrl = (photoName, maxWidth = 1500) => {
        const key = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
        return `https://places.googleapis.com/v1/${photoName}/media?key=${key}&maxHeightPx=${maxWidth}&maxWidthPx=${maxWidth}`;
    };

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.name
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data)
            const photoName = resp.data.places[0].photos[0].name;
            const url = buildPhotoUrl(photoName);
            setPhotoUrl(url);
        })
    }

  return (
      <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.name} target='_blank'>
          <div className='hover:scale-105 transition-all cursor-pointer'>
              <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[200px] w-full object-cover' />
              <div className='my-2 flex flex-col gap-2'>
                  <h2 className='font-medium'>{hotel.name}</h2>
                  <h2 className='text-xs text-gray-500'>📍 {hotel.address}</h2>
                  <h2 className='text-sm text-gray-500'>💰 {hotel.price}</h2>
                  <h2 className='text-sm text-gray-500'>⭐ {hotel.rating}</h2>
              </div>
          </div>
      </Link>
  )
}

export default HotelCardItem