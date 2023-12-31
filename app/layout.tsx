import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import NavBar from '@/app/ui/navbar'
import Search from '@/app/ui/search'
import Footer from '@/app/ui/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A new weather app with all the great features you love.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`h-auto w-screen overflow-x-hidden overflow-y-auto ${inter.className}`}>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
