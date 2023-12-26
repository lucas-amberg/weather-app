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

export default function Home() {

  
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('query') ?? '';

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



  return (
    <main className='flex w-screen h-full p-5 items-start justify-center'>
      <Suspense fallback={<Loading/>}>
        <WeatherItem cityName={searchQuery}/>
      </Suspense>
    </main>
  )
}
