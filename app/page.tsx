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
    <div>
      <WeatherItem cityName={searchQuery}/>
    </div>
  )
}
