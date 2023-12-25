import { findCityCoords, findCoordData } from '@/app/lib/weatherquery'

import { useSearchParams } from 'next/navigation'

import nightCloudy from './night-cloudy.svg'

import '@/app/globals.css'


export default async function WeatherItem({cityName}: {cityName: string}) {

  const cityCoords = await findCityCoords(cityName)

  if (!cityCoords) {
    return(
      <div>
        City coordinates failed to load
      </div>
    )
  }

  const cityData = await findCoordData(cityCoords.latitude, cityCoords.longitude)

  if(!cityData) {
    return(
      <div>
        City data failed to load.
      </div>
    )
  }

  return(
    <div className='p-3 flex-col items-center w-11/12 h-80 shadow-lg bg-gray-200 rounded-xl flex'>
      <div className='flex w-full items-center flex-col'>
        <h1 className='block font-bold text-xl'>{cityCoords.cityName}</h1>
        <h2 className='block'>{cityCoords.state}, {cityCoords.country}</h2>
      </div>
      <div className='h-16 w-full bg-gray-300 rounded-md'>
        
      </div>
    </div>
  )
}