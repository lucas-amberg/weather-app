import { findCityCoords, findCoordData, getImageUrl } from '@/app/lib/weatherquery'

import { useSearchParams } from 'next/navigation'

import { useEffect } from 'react'

import Image from 'next/image'

import '@/app/globals.css'
import ForecastDay from './forecastday'


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

  const imageSrc = getImageUrl(cityData.current.time, cityData.current.weatherCode, false)
  const tomorrowImageSrc = getImageUrl(cityData.current.time, cityData.daily.weatherCode[0], true)
  const twoDaysImageSrc = getImageUrl(cityData.current.time, cityData.daily.weatherCode[1], true)
  const threeDaysImageSrc = getImageUrl(cityData.current.time, cityData.daily.weatherCode[2], true)

  return(
    <div className='p-3 flex-col items-center w-11/12 h-full shadow-lg bg-gray-200 rounded-xl flex gap-5'>
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
      <div className='h-full w-full bg-gray-300 rounded-md flex items-center flex-col justify-evenly'>
        <ForecastDay 
        image={tomorrowImageSrc}
        date={'Tomorrow'}
        high={cityData.daily.temperatureHigh[0]}
        low={cityData.daily.temperatureLow[0]}
        precipitation={cityData.daily.precipitation[0]}
        />
        <ForecastDay 
        image={twoDaysImageSrc}
        date={'In 2 Days'}
        high={cityData.daily.temperatureHigh[1]}
        low={cityData.daily.temperatureLow[1]}
        precipitation={cityData.daily.precipitation[1]}
        />
        <ForecastDay 
        image={threeDaysImageSrc}
        date={'In 3 Days'}
        high={cityData.daily.temperatureHigh[2]}
        low={cityData.daily.temperatureLow[2]}
        precipitation={cityData.daily.precipitation[2]}
        />
      </div>
    </div>
  )
}