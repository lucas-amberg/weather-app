import Image from "next/image"

// This shows a single day's forecast and is used 3 times on the
// city component
export default function ForecastDay({image, date, high, low, precipitation, darkMode}: {image: string, date: string, high: string, low: string, precipitation: string, darkMode: boolean}) {

  // These variables store light mode colors
  let forecastBg = 'bg-gray-200'
  
  // These set to dark if necessary
  if (darkMode) {
    forecastBg = 'bg-gray-800'
  }


  return(
    <div className={`${forecastBg} w-11/12 lg:w-1/4 h-32 lg:h-3/4 rounded-md flex flex-col items-center p-2 justify-center`} suppressHydrationWarning>
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