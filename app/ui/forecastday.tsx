import Image from "next/image"

//Breaks website if refresh page with query in url already
export default function ForecastDay({image, date, high, low, precipitation}: {image: string, date: string, high: string, low: string, precipitation: string}) {

  return(
    <div className="bg-gray-200 w-11/12 lg:w-1/4 h-32 lg:h-3/4 rounded-md flex flex-col items-center p-2 justify-center" suppressHydrationWarning>
      <h1 className="font-bold text-xl lg:text-3xl">{date}</h1>
      <div className="flex items-center gap-5 sm:gap-20 w-full justify-center lg:flex-col lg:gap-3">
        <Image
          src={image}
          height={80}
          width={80}
          alt={`Forecast for ${date}`}
        />
        <div className="">
          <div className="text-center lg:text-xl">
            <div className="font-bold">High:</div> 
            <div>{high}&deg;F</div>
          </div>
          <div className="text-center lg:text-xl">
            <div className="font-bold">Low: </div>
            <div>{low}&deg;F</div>
          </div>
        </div>
        <div className="text-right w-20 md:w-28 lg:text-lg lg:text-center">
          <div className="font-bold text-xs sm:text-md lg:text-lg lg:text-center">
            Precipitation Chance:
          </div>
          <div>
            {precipitation}%
          </div>
        </div>
      </div>
    </div>
  )
}