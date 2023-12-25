import Image from "next/image"

export default function NavBar() {
  return(
    <div className="h-16 bg-white shadow-md">
      <Image
        src={'/partly-cloudy.svg'}
        width={60}
        height={60}
        alt={'Weather App Logo (Partly Cloudy Icon)'}
      />
    </div>
  )
}