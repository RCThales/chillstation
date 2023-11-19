import Link from 'next/link'
import React from 'react'
import PlayerMobile from '@/components/Player/PlayerMobile/PlayerMobile'

const NavbarMobile = () => {
  return (
    <nav className='fixed bottom-0 left-0 w-screen flex md:hidden justify-evenly h-[10vh] min-h-[90px] items-center bg-fuchsia-400'>
      <ul className='flex justify-evenly items-center w-full text-zinc-800 relative'>
          <PlayerMobile></PlayerMobile>
          <Link href={"#"}>Search</Link>
          <Link href={"#"}>Playlists</Link>
          <Link href={"#"}>Library</Link>
      </ul>

    </nav>
  )
}

export default NavbarMobile