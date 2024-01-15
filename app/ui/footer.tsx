"use client";

import { useState, useEffect } from 'react'

// This will return the footer that is displayed at the bottom of the screen
export default function Footer() {

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
  let textColor = 'text-black'

  if (darkClass) {
    bgColor = 'bg-gray-800'
    textColor = 'text-white'
  }


  return(
    <div className={`h-16 text-xs ${bgColor} items-center justify-center ${textColor} flex flex-col`}>
      <a href="https://lucasamberg.dev">&copy; Lucas Amberg 2023-2024 All Rights Reserved</a>
      <a href="https://github.com/lucas-amberg/weather-app">Release v1.1</a>
    </div>
  )
}