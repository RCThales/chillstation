import Link from 'next/link'
import React from 'react'
import PlayerMobile from '@/components/Player/PlayerMobile/PlayerMobile'
import { FaHome, FaSearch } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { IoLibrarySharp } from "react-icons/io5";


const NavbarMobile = () => {
  return (
    <nav className='fixed bottom-0 left-0 w-screen flex md:hidden justify-evenly h-[10vh] min-h-[90px] items-center bg-fuchsia-400'>
      <ul className='flex justify-evenly items-center w-full text-zinc-800 relative'>
          <PlayerMobile></PlayerMobile>
          <Link className='text-2xl' href={"#"}><FaHome /></Link>
          <Link className='text-2xl' href={"#"}><FaSearch /></Link>
          <Link className='text-2xl' href={"#"}><BiSolidPlaylist /></Link>
          <Link className='text-2xl' href={"#"}><IoLibrarySharp /></Link>
      </ul>

    </nav>
  )
}

export default NavbarMobile