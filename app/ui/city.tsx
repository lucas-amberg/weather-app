import Image from "next/image"

import '@/app/globals.css'

import { getImageUrl } from "../lib/weatherquery"

import ForecastDay from "./forecastday"

export default function City({cityData, cityCoords}: {cityData: any, cityCoords: any}) {
  const imageSrc = getImageUrl(cityData.current.isDay, cityData.current.weatherCode, false)
  const tomorrowImageSrc = getImageUrl(cityData.current.isDay, cityData.daily.weatherCode[0], true)
  const twoDaysImageSrc = getImageUrl(cityData.current.isDay, cityData.daily.weatherCode[1], true)
  const threeDaysImageSrc = getImageUrl(cityData.current.isDay, cityData.daily.weatherCode[2], true)
  
  return(
    <li className='p-3 flex-col items-center  justify-evenly w-11/12 h-full shadow-lg bg-gray-200 rounded-xl flex gap-5' key={`${cityCoords.latitude}${cityCoords.location}`}>
      <div className='flex w-full items-center flex-col'>
          <h1 className='block font-bold text-xl lg:text-3xl'>{cityCoords.cityName}</h1>
          <h2 className='block lg:text-xl'>{cityCoords.location}</h2>
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
                {cityData.current.temperature}&deg;F
            </h1>
          </div>
          <div className='flex flex-col justify-end'>
            <div className='text-xs text-right font-bold md:text-sm text-gray-800 lg:text-md'>
              Precipitation Chance:
            </div>
            <div className='text-xl text-right text-gray-800'>
              {cityData.current.precipitation}%
            </div>
          </div>
        </div>
        <h1 className='text-xl font-bold lg:text-2xl'>Three Day Forecast:</h1>
        <div className='h-auto w-full p-3 gap-3 bg-gray-300 rounded-md flex items-center flex-col justify-evenly lg:flex-row'>
          {/*Each of these returns a single day from the 3 day forecast*/}
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
    </li>

  )
}