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
export default function Homepage({darkMode}: {darkMode: boolean}) {

  // Light mode colors
  let titleBg = 'bg-gray-100'
  let titleText = ''
  let titleLinkText = 'text-blue-600'

  // Sets to dark if necessary
  if (darkMode) {
    titleBg = 'bg-gray-900'
    titleText = 'text-white'
    titleLinkText = 'text-blue-300'
  }

  // Grabs the image to be displayed in the top component on the homepage
  const homepageImageSrc = getRandomImage();

  return(
      <div className={`flex flex-col gap-5 items-center justify-center w-5/6 h-400px shadow-lg h-full rounded-lg ${titleBg}`}>
        <h1 className={`text-xl font-bold md:text-3xl ${titleText}`}>
          Next.js Weather App
        </h1>
        <Image
          src={homepageImageSrc}
          width={100}
          height={100}
          alt='Homepage Image'
          className='md:w-36'
        />
        <div className={`text-sm md:w-lg ${titleText}`}>
          Created by <Link className={`${titleLinkText}`} href={'https://lucasamberg.dev/'}>Lucas Amberg</Link>
        </div>
      </div>
  )
}