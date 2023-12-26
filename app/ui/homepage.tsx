import Image from 'next/image'
import Link from 'next/link';
import { weatherCodeImagesDay } from '@/app/lib/weathericon'

function getRandomImage(): string {
  const randomNumber = Math.floor(Math.random() * 90);
  return `/${weatherCodeImagesDay[randomNumber]}.svg`
}

export default function Homepage() {

  const homepageImageSrc = getRandomImage();

  return(
      <div className="flex flex-col items-center justify-center w-5/6 h-400px shadow-lg h-full rounded-lg bg-gray-100">
        <h1 className='text-xl font-bold'>
          Next.js Weather App
        </h1>
        <Image
          src={homepageImageSrc}
          width={100}
          height={100}
          alt='Homepage Image'
        />
        <div className='text-sm'>
          Created by <Link className='text-blue-600' href={'https://lucasamberg.dev/'}>Lucas Amberg</Link>
        </div>
      </div>
  )
}