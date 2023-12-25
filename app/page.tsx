"use client";

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { findCityCoords, findCoordData } from './lib/weatherquery';
import WeatherItem from './ui/weatheritem';

export default function Home() {

  
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('query') ?? '';

  if (!searchParams.get('query')) {
    return (
      <main>
        theres nothing
      </main>
    )
  } 



  return (
    <div className='flex w-screen h-screen p-5 items-center justify-center'>
      <WeatherItem cityName={searchQuery}/>
    </div>
  )
}
