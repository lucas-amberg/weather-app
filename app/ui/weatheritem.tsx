import { findCityCoords, findCoordData, getImageUrl } from '@/app/lib/weatherquery'

import { useSearchParams } from 'next/navigation'

import Image from 'next/image'

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

  const imageSrc = getImageUrl(cityData.current.time, cityData.current.weatherCode)

  return(
    <div className='p-3 flex-col items-center w-11/12 h-80 shadow-lg bg-gray-200 rounded-xl flex'>
      <div className='flex w-full items-center flex-col'>
        <h1 className='block font-bold text-xl'>{cityCoords.cityName}</h1>
        <h2 className='block'>{cityCoords.state}, {cityCoords.country}</h2>
      </div>
      <div className='h-16 w-full bg-gray-300 rounded-md flex items-center gap-10 sm:justify-around'>
        <div className='flex items-center'>
          <Image
            src={imageSrc}
            height={70}
            width={70}
            alt={'Current weather'}
          />
          <h1 className='text-2xl font-bold'>
              {cityData.current.temperature}&deg;F
          </h1>
        </div>
        <div className='flex flex-col justify-end'>
          <div className='text-xs font-bold md:text-sm text-gray-800'>
            Chance of Rain:
          </div>
          <div className='text-2xl font-bold text-right text-gray-800'>
            {cityData.current.precipitation}%
          </div>
        </div>
      </div>
    </div>
  )
}