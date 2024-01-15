import { findCityCoords, findCoordData, getImageUrl } from '@/app/lib/weatherquery'

import { useSearchParams } from 'next/navigation'

import { useState, useEffect } from 'react'

import City from '@/app/ui/city'

import Image from 'next/image'

import '@/app/globals.css'
import ForecastDay from './forecastday'

//Displays weather information for the city name searched in the search bar
export default async function WeatherItem({cityName, darkMode}: {cityName: string, darkMode: boolean}) {

  let weatherItemBg = ''

  if (darkMode) {
    weatherItemBg = 'bg-gray-700'
  }

  //Gets all the city coordinate options for the city name requested
  const cityCoords = await findCityCoords(cityName)

  if (!cityCoords) {
    return(
      <div>
        {`City data for the city "${cityName}" failed to load, check your search query or try again`}
      </div>
    )
  }

  const cityData:any = []

  //For every item stored in city coords (all city options), query weather api for
  //the data and store it in an array
  for (let i = 0; i < cityCoords.length; i++) {
    const fetchedData = await findCoordData(cityCoords[i].latitude, cityCoords[i].longitude)
    cityData.push(fetchedData)
  }

  //If no cities are found return this
  if(cityData.length === 0 || !cityData) {
    return(
      <div>
        City data failed to load. Please contact the developer if this issue persists.
      </div>
    )
  }

  const cityElements = []

  for (let i = 0; i < cityCoords.length; i++) {
    cityElements.push(<City darkMode={darkMode} cityData={cityData[i]} cityCoords={cityCoords[i]}/>)
  }

  //Gets the cooresponding weather images for the city that is being shown
  

  //Returns the HTML item
  return(
    <ul className={`w-screen h-auto flex flex-col items-center justify-center gap-10 p-4 ${weatherItemBg}`}>
      {cityElements}
    </ul>
  )
}