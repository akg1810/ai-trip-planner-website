export const SelectTravelList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveler in exploration',
        icon:'🤸',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'2 travelers in tandem',
        icon:'👩‍❤️‍👨',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving people',
        icon:'🏡',
        people:'3+'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill seekers',
        icon:'🚀',
        people:'5+'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Do not worry about cost',
        icon:'💸'
    }
]

export const AI_PROMPT='Generate Travel Plan for Location : {location} for {totalDays} days for {traveler} people with a {budget} budget. Give me a Hotels options list with hotel name, hotel address , price, hotel image url, geo coordinates, rating, description and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, rating, time travel for each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'