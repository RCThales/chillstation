import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
import './globals.css'
import NavBars from "./../components/Navbar/Navbars"
import Player from '@/components/Player/Player'

const geo = Geologica({ subsets: ['latin'], weight:['100', '400', '800'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geo.className}flex flex-col`}>
        <div className='flex'>
          <NavBars/>
          {children}
        </div>
        <Player/>
      </body>
    </html>
  )
}