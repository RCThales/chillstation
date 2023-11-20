"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import PlayerMobile from '@/components/Player/PlayerMobile/PlayerMobile'
import { FaHome, FaSearch } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { IoLibrarySharp } from "react-icons/io5";


const NavbarMobile = () => {
 const [showFooter, setShowFooter] = useState(true);

  const hideFooterNow = () => {
      setShowFooter(!showFooter);

  }

  return (
    <nav className='fixed bottom-0 w-screen flex md:hidden justify-center h-[70px] min-h-[70px] z-[99999] items-center '>
      <PlayerMobile hideFooter={hideFooterNow}></PlayerMobile>
      <ul className={`${!showFooter && 'translate-y-[70px]'} transition-all flex justify-evenly  z-[99999] items-center w-full text-zinc-800 relative h-full bg-pink-300`}>
          <Link className='text-2xl' href={"#"}><FaHome /></Link>
          <Link className='text-2xl' href={"#"}><FaSearch /></Link>
          <Link className='text-2xl' href={"#"}><BiSolidPlaylist /></Link>
          <Link className='text-2xl' href={"#"}><IoLibrarySharp /></Link>
      </ul>

    </nav>
  )
}

export default NavbarMobile