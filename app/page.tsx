"use client";

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { findCityCoords, findCoordData } from './lib/weatherquery';
import WeatherItem from './ui/weatheritem';
import { Suspense } from 'react';
import Loading from '@/app/ui/loading';
import { Metadata } from 'next';

import Homepage from '@/app/ui/homepage';
import Instructions from './ui/instructions';

// This is the homepage and technically the whole website
export default function Home() {

  
  // This checks to see if a city was searched
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('query') ?? '';

  // If a city is not in the URL, it shows the homepage...
  if (!searchParams.get('query')) {
    return (
      <main>
        <div className="grid w-full h-96 grid-cols-1 place-items-center p-7">
          <Homepage/>
        </div>
        <div className="grid w-full h-96 grid-cols-1 place-items-center p-7">
          <Instructions/>
        </div>
      </main>
    )
  } 

  // ... otherwise it shows the weather for that search
  return (
    <main className='flex w-screen h-full p-5 items-start justify-center'>
      <Suspense fallback={<Loading/>}>
        <WeatherItem cityName={searchQuery}/>
      </Suspense>
    </main>
  )
}
