import { findCityCoords, findCoordData } from '@/app/lib/weatherquery'

import { useSearchParams } from 'next/navigation'


export default async function WeatherItem({cityName}: {cityName: string}) {

  const cityCoords = await findCityCoords(cityName)



  return(
    <div>
      {cityCoords.latitude}
    </div>
  )
}