import Image from "next/image"

// This is the page that is displayed when a city is being searched
export default function Loading({darkMode}: {darkMode: boolean}) {

  // Light mode
  let textColor = 'text-black'

  // Dark mode
  if (darkMode) {
    textColor = 'text-white'
  }


  return(
    <div className="h-max flex items-center justify-center flex-col p-64 md:p-48">
      <h1 className={`text-3xl text-center ${textColor}`}>
        Loading...
      </h1>
      <Image
      src={'/thermometer.svg'}
      width={200}
      height={200}
      alt="Loading content (Thermometer Image)"
      />

    </div>
  )
}