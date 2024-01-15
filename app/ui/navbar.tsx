"use client";

import Image from "next/image";
import Search from "./search";

import Link from "next/link";

import { useState, useEffect } from 'react'

//The navbar will rest at the top of every page and is responsible for displaying
//the search bar which is necessary for the site to function



export default function NavBar() {

  // Uses state to set color
  const [darkClass, setDarkClass] = useState(false)

  // Use effect to access window object to get preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
        .matches;
    console.log(prefersDark)
    if (prefersDark) {
      setDarkClass(true)
    }
  },[]) 

  let bgColor = 'bg-white'
  let navIcon = 'day'

  if (darkClass) {
    bgColor = 'bg-gray-800'
    navIcon = 'night'
  }


  return(
    <div className={`h-16 ${bgColor} shadow-md flex justify-between p-4 items-center md:p-6`}>
      <Link href={'/'}>
        <Image
          src={`/partly-cloudy-${navIcon}.svg`}
          width={60}
          height={60}
          alt={'Weather App Logo (Partly Cloudy Icon)'}
        />
      </Link>
      <Search darkMode={darkClass} placeholder="Search cities..."/>
    </div>
  );
}