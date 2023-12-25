import { fetchWeatherApi } from "openmeteo"

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
        weatherCode: jsonQuery.current.weather_code
      }
    }

    return results
  }

  return null
}

export  {
  findCityCoords,
  findCoordData
}