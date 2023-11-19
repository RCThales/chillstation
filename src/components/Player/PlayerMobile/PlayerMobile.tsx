"use client";
import React, { useState } from 'react'
import { MdOutlineSkipPrevious,  MdOutlineSkipNext, MdPlayArrow, MdOutlinePause  } from "react-icons/md";

const PlayerMobile = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
      setIsPlaying(!isPlaying);
  }
  const nextAudio = () => {
    alert("next");
  }
  const previousAudio = () => {
    alert("prev");
  }

  return (
  <section className='fixed h-[100px] bottom-24 z-[999] w-[98vw] rounded-md gap-4 bg-fuchsia-900 justify-center items-center flex flex-col md:hidden'>
    <audio preload='metadata' src='https://chillstation.s3.amazonaws.com/public/Midnight-Stroll-Lofi-Study-Music(chosic.com).mp3'></audio>
    <div className='flex justify-center items-center gap-10'>
      {/* PREVIOUS */}
      <button onClick={previousAudio} className='w-10 h-10 rounded-3xl bg-fuchsia-500 flex justify-center items-center text-3xl 
      hover:bg-transparent hover:text-white hover:border-2 hover:border-fuchsia-500 transition-all'><MdOutlineSkipPrevious/></button>
      {/* PLAY */}
      <button onClick={togglePlay} className='w-10 h-10 rounded-3xl bg-fuchsia-500 flex justify-center items-center text-4xl 
      hover:bg-transparent hover:text-white hover:border-2 hover:border-fuchsia-500 transition-all'>{!isPlaying ? <MdPlayArrow /> : <MdOutlinePause />}</button>
      {/* NEXT */}
      <button onClick={nextAudio} className='w-10 h-10 rounded-3xl bg-fuchsia-500 flex justify-center items-center text-3xl
      hover:bg-transparent hover:text-white hover:border-2 hover:border-fuchsia-500 transition-all'><MdOutlineSkipNext/></button>
    </div>

    <div className='flex gap-10'>
     <div className='text-zinc-50 m-auto'>01:10</div>
      <input type="range" name="" id="" />
      <div className='text-zinc-50 m-auto'>01:10</div>
    </div>

</section>
  )
}

export default PlayerMobile;