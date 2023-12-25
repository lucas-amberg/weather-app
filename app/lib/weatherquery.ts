import { fetchWeatherApi } from "openmeteo"

import { weatherCodeImagesDay, weatherCodeImagesNight } from "@/app/lib/weathericon"

//This function takes the name of a city (from the search bar)
//and returns the coordinates of it
const findCityCoords = async ( cityName: string ) => {
  const query = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`)
  const jsonQuery = await query.json()

  

  //This makes sure the results were actually fetched
  if (jsonQuery.results && jsonQuery.results[0]) {
    const result = jsonQuery.results[0]
    if (result.latitude !== undefined && result.longitude !== undefined) {
      return{
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country,
        state: result.admin1,
        cityName: result.name
      }
    }
  }
  //Otherwise it returns null
  return null
} 

const findCoordData = async (lat: string, long: string) => {
  const query = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles&forecast_days=3`)
  const jsonQuery = await query.json()

  if (jsonQuery.latitude && jsonQuery.longitude) {

    //Currently is just the hour but once you figure out date api you will have to
    //change to get the hour from the time before assigning to time variable
    const time = new Date().getHours()

    const results = {
      daily: {
        time: jsonQuery.daily.time,
        weatherCode: jsonQuery.daily.weather_code,
        temperatureHigh: jsonQuery.daily.temperature_2m_max,
        temperatureLow: jsonQuery.daily.temperature_2m_min,
        sunrise: jsonQuery.daily.sunrise,
        sunset: jsonQuery.daily.sunset,
        precipitation: jsonQuery.daily.precipitation_probability_max
      },
      current: {
        temperature: jsonQuery.current.temperature_2m,
        precipitation: jsonQuery.current.precipitation,
        weatherCode: jsonQuery.current.weather_code,
        time: time
      }
    }

    return results
  }

  return null
}

const getImageUrl = (hour: number, weatherCode: number) => {
  if (hour >= 18 || hour <= 6) {
    return `/${weatherCodeImagesNight[weatherCode]}.svg`
  }
  return `/${weatherCodeImagesDay[weatherCode]}.svg`
}

// Work on this at some point it is giving me a headace

// const getTime = async (lat: string, long: string) => {
//   const timeApiKey = process.env.TIME_API_KEY
//   const query = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=position&lat=${lat}&lng=-${long}`)
//   const jsonQuery = await query.json()

//   //If data is not recieved then just return daytime
//   if (!jsonQuery.formatted) {
//     return (
//       '12:00'
//     )
//   }

//   if (jsonQuery.formatted) {
//     return(
//       jsonQuery.formatted
//     )
//   }

//   return '12:00'

// }

export  {
  findCityCoords,
  findCoordData,
  getImageUrl
}