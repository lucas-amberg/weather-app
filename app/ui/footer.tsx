"use client";

import { useState, useEffect } from 'react'

// This will return the footer that is displayed at the bottom of the screen
export default function Footer() {

  // Uses state to set color
  const [darkClass, setDarkClass] = useState(false)

  // Use effect to access window object to get preference
  useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      const mode = localStorage.getItem('darkMode')
      if (mode === 'dark') {
        setDarkClass(true)
      }
      else {
        setDarkClass(false)
      }
    }
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
        .matches;
      if (prefersDark) {
        localStorage.setItem('darkMode', 'dark')
        setDarkClass(true)
      }
      else {
        localStorage.setItem('darkMode', 'light')
        setDarkClass(false)
      }
    }
  },[]) 

  let bgColor = 'bg-white'
  let textColor = 'text-black'
  let buttonText = 'Dark'

  if (darkClass) {
    bgColor = 'bg-gray-800'
    textColor = 'text-white'
    buttonText = 'Light'
  }

  const setDarkMode = (e) => {
    e.preventDefault()
    const currentColor = localStorage.getItem('darkMode')
    currentColor == 'dark' ? localStorage.setItem('darkMode', 'light') : localStorage.setItem('darkMode', 'dark')
    window.location.reload();
  }

  return(
    <div className={`h-16 text-xs ${bgColor} items-center justify-center ${textColor} flex flex-col`}>
      <a href="https://lucasamberg.dev">&copy; Lucas Amberg 2023-2024 All Rights Reserved</a>
      <a href="https://github.com/lucas-amberg/weather-app">Release v1.1</a>
      <button className='p-1' onClick={setDarkMode}>{`Change To ${buttonText} Mode`}</button>
    </div>
  )
}