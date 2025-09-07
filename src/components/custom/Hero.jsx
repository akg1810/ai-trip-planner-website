import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 mt-30'>
      <h1 className='font-extrabold text-[60px] text-center mt-16'>
        <span className='text-[#f56551] text-[50px]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at your fingertips
      </h1>
      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, 
        creating custom itineraries to your interests and budget.
      </p>
      <Link to={'/create-trip'}><Button className='cursor-pointer'>Get Started, it's free!</Button></Link>
    </div>
  )
}

export default Hero
