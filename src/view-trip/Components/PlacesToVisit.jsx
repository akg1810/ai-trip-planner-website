import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({trip}) => {
  return (
    <div className='px-50 py-10'>
        <h2 className='font-bold text-xl'>Places To Visit</h2>
        <div>
            {trip?.tripData?.travelPlan?.itinerary.map((item, index)=>(
                <div className='mt-5'>
                    <h2 className='font-bold text-lg'>Day {item.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item?.plan.map((place, index)=>(
                        <div >
                            <h2 className='font-medium text-sm text-orange-600'>{place.bestTimeToVisit}</h2>
                            <PlaceCardItem place={place}/>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit