'use client';

import Image from "next/image"

//Breaks website if refresh page with query in url already
export default function ForecastDay({image, date, high, low, precipitation}: {image: string, date: string, high: string, low: string, precipitation: string}) {

  return(
    <div className="bg-gray-200 w-11/12 h-36 rounded-md flex flex-col items-center p-2">
      <h1 className="font-bold text-xl">{date}</h1>
      <div className="flex items-center">
        <Image
          src={image}
          height={80}
          width={80}
        />
        <div>
          <div className="text-center">
            <span className="font-bold">High:</span> {high}&deg;F
          </div>
          <div className="text-center">
            <span className="font-bold">Low: </span>{low}&deg;F
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-sm">
            Chance of Rain:
          </div>
          <div>
            {precipitation}%
          </div>
        </div>
      </div>
    </div>
  )
}