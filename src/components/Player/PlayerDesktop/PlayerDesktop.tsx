import React from 'react'

const PlayerDesktop = () => {



  return (
    <section className='h-[10vh] w-screen bg-fuchsia-900 justify-center items-center gap-10 hidden md:flex'>

        <button className='w-14 h-10 rounded-3xl bg-fuchsia-500'>PREV</button>
        <button className='w-14 h-14 rounded-3xl bg-fuchsia-500'>PLAY</button>
        <button className='w-14 h-10 rounded-3xl bg-fuchsia-500'>NEXT</button>
    </section>
  )
}

export default PlayerDesktop