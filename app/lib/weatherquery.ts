const findCityCoords = async ( cityName: string ) => {
  const query = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`)
  const jsonQuery = await query.json()

  return {
    latitude: jsonQuery.results[0].latitude,
    longitude: jsonQuery.results[0].longitude,
  }
} 

const findCoordData = async ({lat, long}: {lat: string, long: string}) => {
  
}

export  {
  findCityCoords,
  findCoordData
}