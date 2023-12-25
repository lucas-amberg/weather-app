import Image from "next/image"

export default function Loading() {
  return(
    <div>
      <h1 className="text-3xl text-center">
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