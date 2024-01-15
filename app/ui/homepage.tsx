import Image from 'next/image'
import Link from 'next/link';
import { weatherCodeImagesDay } from '@/app/lib/weathericon'

// This function gets a random image from the icons to display
// on the top homepage component
function getRandomImage(): string {
  const randomNumber = Math.floor(Math.random() * 90);
  return `/${weatherCodeImagesDay[randomNumber]}.svg`
}

// This component is the homepage of the website.
export default function Homepage() {

  // Grabs the image to be displayed in the top component on the homepage
  const homepageImageSrc = getRandomImage();

  return(
      <div className="flex flex-col gap-5 items-center justify-center w-5/6 h-400px shadow-lg h-full rounded-lg bg-gray-100">
        <h1 className='text-xl font-bold md:text-3xl'>
          Next.js Weather App
        </h1>
        <Image
          src={homepageImageSrc}
          width={100}
          height={100}
          alt='Homepage Image'
          className='md:w-36'
        />
        <div className='text-sm md:w-lg'>
          Created by <Link className='text-blue-600' href={'https://lucasamberg.dev/'}>Lucas Amberg</Link>
        </div>
      </div>
  )
}