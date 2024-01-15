"use client";

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { findCityCoords, findCoordData } from './lib/weatherquery';
import WeatherItem from './ui/weatheritem';
import { Suspense, useEffect, useState } from 'react';
import Loading from '@/app/ui/loading';
import { Metadata } from 'next';


import Homepage from '@/app/ui/homepage';
import Instructions from './ui/instructions';

// This is the homepage and technically the whole website
export default function Home() {

  // Uses state to set color
  const [darkClass, setDarkClass] = useState(false)

  // Use effect to access window object to get preference
  useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      const mode = localStorage.getItem('darkMode')
      if (mode === 'dark') {
        setDarkClass(true)
      }
      else {
        setDarkClass(false)
      }
    }
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
        .matches;
      if (prefersDark) {
        localStorage.setItem('darkMode', 'dark')
        setDarkClass(true)
      }
      else {
        localStorage.setItem('darkMode', 'light')
        setDarkClass(false)
      }
    }
  },[]) 


  let backgroundColor = ''
  if (darkClass) {
    backgroundColor = 'bg-gray-700'
  }

  // This checks to see if a city was searched
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('query') ?? '';

  // If a city is not in the URL, it shows the homepage...
  if (!searchParams.get('query')) {
    return (
      <main className={`${backgroundColor}`}>
        <div className="grid w-full h-96 grid-cols-1 place-items-center p-7">
          <Homepage darkMode={darkClass}/>
        </div>
        <div className="grid w-full h-96 grid-cols-1 place-items-center p-7">
          <Instructions darkMode={darkClass}/>
        </div>
      </main>
    )
  } 

  // ... otherwise it shows the weather for that search
  return (
    <main className={`flex w-screen h-full p-5 items-start justify-center ${backgroundColor}`}>
      <Suspense fallback={<Loading darkMode={darkClass}/>}>
        <WeatherItem darkMode={darkClass} cityName={searchQuery}/>
      </Suspense>
    </main>
  )
}
