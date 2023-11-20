import Link from 'next/link'
import React from 'react'

const NavbarDesktop = () => {
  return (
    <nav className='min-h-[90vh] hidden md:flex md:w-32 lg:w-72 justify-evenly items-center flex-col gap-3 bg-fuchsia-300'>
      <ul className='flex justify-center items-center flex-col w-full h-[20%] p-10 gap-10 text-zinc-800 bg-fuchsia-400 rounded-2xl'>
          <Link href={"#"}>Home</Link>
          <Link href={"#"}>Search</Link>
      </ul>

      <ul className='flex justify-start items-center flex-col w-full  h-[80%] p-10 gap-10 text-zinc-800 bg-fuchsia-400 rounded-2xl'>
          <h2 className='font-semibold uppercase hidden lg:flex text-xl'>Your Library</h2>
          <Link href={"#"}>Home</Link>
          <Link href={"#"}>Search</Link>
          <Link href={"#"}>Playlists</Link>
          <Link href={"#"}>Library</Link>
      </ul>
    </nav>
  )
}

export default NavbarDesktop