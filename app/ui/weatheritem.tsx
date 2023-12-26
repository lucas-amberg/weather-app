import { findCityCoords, findCoordData, getImageUrl } from '@/app/lib/weatherquery'

import { useSearchParams } from 'next/navigation'

import { useState, useEffect } from 'react'

import Image from 'next/image'

import '@/app/globals.css'
import ForecastDay from './forecastday'

//Displays weather information for the city name searched in the search bar
export default async function WeatherItem({cityName}: {cityName: string}) {

  //In the future this hook will be used to switch between cities
  const [citySelection, setCitySelection] = useState(0)

  //Gets all the city coordinate options for the city name requested
  const cityCoords = await findCityCoords(cityName)
  

  console.log(cityCoords)

  if (!cityCoords) {
    return(
      <div>
        City coordinates failed to load
      </div>
    )
  }

  //If there was a result for the search, this will set it to show its first item by default
  //?
  setCitySelection(0)

  const cityData:any = []

  //For every item stored in city coords (all city options), query weather api for
  //the data and store it in an array
  for (let i = 0; i < cityCoords.length; i++) {
    const fetchedData = await findCoordData(cityCoords[i].latitude, cityCoords[i].longitude)
    cityData.push(fetchedData)
  }

  console.log(cityData)

  //If no cities are found return this
  if(cityData.length === 0 || !cityData) {
    return(
      <div>
        City data failed to load.
      </div>
    )
  }

  //Gets the cooresponding weather images for the city that is being shown
  const imageSrc = getImageUrl(cityData[citySelection].current.time, cityData[citySelection].current.weatherCode, false)
  const tomorrowImageSrc = getImageUrl(cityData[citySelection].current.time, cityData[citySelection].daily.weatherCode[0], true)
  const twoDaysImageSrc = getImageUrl(cityData[citySelection].current.time, cityData[citySelection].daily.weatherCode[1], true)
  const threeDaysImageSrc = getImageUrl(cityData[citySelection].current.time, cityData[citySelection].daily.weatherCode[2], true)

  //Returns the HTML item
  return(
    <div className='p-3 flex-col items-center  justify-evenly w-11/12 h-full shadow-lg bg-gray-200 rounded-xl flex gap-5'>
      <div className='flex w-full items-center flex-col'>
        <h1 className='block font-bold text-xl lg:text-3xl'>{cityCoords[citySelection].cityName}</h1>
        <h2 className='block lg:text-xl'>{cityCoords[citySelection].location}</h2>
      </div>
      <h1 className='text-xl font-bold lg:text-2xl'>Current Weather:</h1>
      <div className='h-16 p-5 w-full bg-gray-300 rounded-md flex items-center gap-10 sm:justify-around lg:h-24'>
        <div className='flex items-center'>
          <Image
            src={imageSrc}
            height={70}
            width={70}
            alt={'Current weather'}
          />
          <h1 className='text-2xl font-bold'>
              {cityData[citySelection].current.temperature}&deg;F
          </h1>
        </div>
        <div className='flex flex-col justify-end'>
          <div className='text-xs text-right font-bold md:text-sm text-gray-800 lg:text-md'>
            Precipitation Chance:
          </div>
          <div className='text-xl text-right text-gray-800'>
            {cityData[citySelection].current.precipitation}%
          </div>
        </div>
      </div>
      <h1 className='text-xl font-bold lg:text-2xl'>Three Day Forecast:</h1>
      <div className='h-full w-full bg-gray-300 rounded-md flex items-center flex-col justify-evenly lg:flex-row'>
        {/*Each of these returns a single day from the 3 day forecast*/}
        <ForecastDay 
        image={tomorrowImageSrc}
        date={'Tomorrow'}
        high={cityData[citySelection].daily.temperatureHigh[0]}
        low={cityData[citySelection].daily.temperatureLow[0]}
        precipitation={cityData[citySelection].daily.precipitation[0]}
        />
        <ForecastDay 
        image={twoDaysImageSrc}
        date={'In 2 Days'}
        high={cityData[citySelection].daily.temperatureHigh[1]}
        low={cityData[citySelection].daily.temperatureLow[1]}
        precipitation={cityData[citySelection].daily.precipitation[1]}
        />
        <ForecastDay 
        image={threeDaysImageSrc}
        date={'In 3 Days'}
        high={cityData[citySelection].daily.temperatureHigh[2]}
        low={cityData[citySelection].daily.temperatureLow[2]}
        precipitation={cityData[citySelection].daily.precipitation[2]}
        />
      </div>
    </div>
  )
}