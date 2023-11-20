"use client";
import React, { useState, useRef, useEffect } from 'react'
import { MdOutlineSkipPrevious,  MdOutlineSkipNext, MdPlayArrow, MdOutlinePause, MdOutlineArrowRightAlt  } from "react-icons/md";
import { RiLoopLeftFill } from "react-icons/ri";
import { GoUnmute, GoMute } from "react-icons/go";
import Image from 'next/image';

const PlayerMobile = () => {
  //STATES
  const [fullSize, setFullSize] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("00:00");
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentDuration, setCurrentDuration] = useState("00:00");

  //REFS
  const audioRef : any = useRef(null);
  const trackRef : any = useRef(null);
  const animationRef : any = useRef(null);

  //SIDE EFFECTS
  useEffect(() => {
  const audioSizeInSeconds = audioRef.current.duration;
  trackRef.current.max = audioSizeInSeconds;

  const audioLength = calculateTime(audioSizeInSeconds);
  setDuration(audioLength);

  },[audioRef?.current?.loadedMetadata, audioRef?.current?.readyState])

  //FUNCTIONS
  const calculateTime = (num : number) => {
    const minutes = Math.floor(num / 60);
    const seconds = Math.floor(num % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const formattedDuration = `${formattedMinutes}:${formattedSeconds}`;
    return formattedDuration;
  }

  const moveTrack = () => {
    const trackCurrentTime = trackRef.current.value;
    audioRef.current.currentTime = trackCurrentTime;  
    setCurrentDuration(calculateTime(trackCurrentTime));
  }

  const whilePlaying = () => {
    if(!isPlaying){
      if(audioRef.current.currentTime === audioRef.current.duration){
        setIsPlaying(false);
      }
      else{
        const trackCurrentTime = trackRef.current.value;
        trackRef.current.value = audioRef.current.currentTime;
        setCurrentDuration(calculateTime(trackCurrentTime));
        animationRef.current = requestAnimationFrame(whilePlaying)
      }
    }

  }

  const toggleFullsize = () => {
    
    setFullSize(!fullSize);
    
  }

  const toggleMuted = () => {
    
    if(!isMuted){
      audioRef.current.muted = true;
    }
    else{
      audioRef.current.muted = false;
    }
    setIsMuted(!isMuted);
    
  }
  const toggleLoop = () => {
    
    if(!isLooping){
      audioRef.current.loop = true;
    }
    else{
      audioRef.current.loop = false;
    }
    setIsLooping(!isLooping);
    
  }

  const togglePlay = () => {
    
      setIsPlaying(!isPlaying);
      if(isPlaying){
        audioRef?.current?.pause();
        cancelAnimationFrame(animationRef?.current);
      }
      else{
        audioRef?.current?.play();
        animationRef.current = requestAnimationFrame(whilePlaying)
      }
  }

  const nextAudio = () => {
    if(audioRef.current.currentTime > 5){
      console.log(duration)
      audioRef.current.currentTime = trackRef.current.max-3;
      trackRef.current.value = trackRef.current.max-3;
  }
  else{
    //go to next song on the queue
  }
  }
  const previousAudio = () => {
    if(audioRef.current.currentTime > 5){
        audioRef.current.currentTime = 0;
        trackRef.current.value = 0;
    }
    else{
      //go to previous song on the queue
    }
  }

  return (
    <>
      <audio ref={audioRef} preload='metadata' src='https://chillstation.s3.amazonaws.com/public/Midnight-Stroll-Lofi-Study-Music(chosic.com).mp3'></audio>

      {fullSize ?      
      <section className='fixed h-full bottom-20 z-[999] min-h-[500px] w-screen gap-4 backdrop-blur-sm bg-fuchsia-400/50 justify-center items-center flex flex-col md:hidden'>
        
        <Image priority src={"https://chillstation.s3.amazonaws.com/public/500x500.jpg"} className='max-w-[90vw] w-[300px] h-auto shadow-lg shadow-fuchsia-400 rounded-md m-auto' width={1500} height={1500} alt={"Song cover-art."}></Image>
        <div className='flex flex-col gap-4 justify-center items-center w-full'>
          
          <div className='flex justify-center items-center gap-10'>
             {/* LOOP */}
             <button onClick={toggleLoop} className='w-10 h-10 rounded-xl  flex justify-center items-center text-2xl 
            hover:bg-transparent  hover:border-2 border-fuchsia-500 transition-all'>{isLooping ? <RiLoopLeftFill /> : <MdOutlineArrowRightAlt /> }</button>
            {/* PREVIOUS */}
            <button onClick={previousAudio} className='w-10 h-10 rounded-xl bg-fuchsia-500 flex justify-center items-center text-3xl 
            hover:bg-transparent  hover:border-2 border-fuchsia-500 transition-all'><MdOutlineSkipPrevious/></button>
            {/* PLAY */}
            <button onClick={togglePlay} className='w-14 h-14 rounded-xl bg-fuchsia-500 flex justify-center items-center text-4xl 
            hover:bg-transparent  hover:border-2 border-fuchsia-500 transition-all'>{!isPlaying ? <MdPlayArrow /> : <MdOutlinePause />}</button>
            {/* NEXT */}
            <button onClick={nextAudio} className='w-10 h-10 rounded-xl bg-fuchsia-500 flex justify-center items-center text-3xl
            hover:bg-transparent  hover:border-2 border-fuchsia-500 transition-all'><MdOutlineSkipNext/></button>
             {/* MUTE */}
             <button onClick={toggleMuted} className='w-10 h-10 rounded-xl  flex justify-center items-center text-2xl
            hover:bg-transparent hover:border-2 border-fuchsia-500 transition-all'>{!isMuted ? <GoUnmute /> : <GoMute />}</button>
          </div>

          <div className='flex w-full gap-4 justify-center items-center  pb-4'>
            {/* AUDIO CURRENT TIME */}
            <div className='text-zinc-800'>{currentDuration}</div>
            {/* TRACK */}
            <input ref={trackRef} onChange={moveTrack} defaultValue={"0"} className='w-[50%] range bg-fuchsia-200 appearance-none rounded-md cursor-pointer accent-fuchsia-800' type="range" name="" id="" />
            {/* AUDIO LENGTH */}
            <div className='text-zinc-800'>{duration}</div>
          </div>
        </div>
        <button onClick={toggleFullsize} className='absolute bg-red-500 top-0 left-0 text-zinc-800 z-[9999]'>BACK</button>
      </section> 
      :
      <section  className='fixed h-[100px] bottom-24 z-[999] w-[98vw] rounded-md gap-4 backdrop-blur-sm bg-fuchsia-400/50 justify-center items-center flex flex-col md:hidden'>
        <div className='flex justify-center items-center gap-10'>
          {/* PREVIOUS */}
          <button onClick={previousAudio} className='w-10 h-10 rounded-3xl bg-fuchsia-500 flex justify-center items-center text-3xl 
          hover:bg-transparent  hover:border-2 border-fuchsia-500 transition-all'><MdOutlineSkipPrevious/></button>
          {/* PLAY */}
          <button onClick={togglePlay} className='w-10 h-10 rounded-3xl bg-fuchsia-500 flex justify-center items-center text-4xl 
          hover:bg-transparent  hover:border-2 border-fuchsia-500 transition-all'>{!isPlaying ? <MdPlayArrow /> : <MdOutlinePause />}</button>
          {/* NEXT */}
          <button onClick={nextAudio} className='w-10 h-10 rounded-3xl bg-fuchsia-500 flex justify-center items-center text-3xl
          hover:bg-transparent  hover:border-2 border-fuchsia-500 transition-all'><MdOutlineSkipNext/></button>
        </div>

        <div className='flex w-full gap-4 justify-center items-center'>
          {/* AUDIO CURRENT TIME */}
          <div className='text-zinc-800'>{currentDuration}</div>
          {/* TRACK */}
          <input ref={trackRef} onChange={moveTrack} defaultValue={"0"} className='w-[50%] range bg-fuchsia-200 appearance-none rounded-2xl cursor-pointer accent-fuchsia-800' type="range" name="" id="" />
          {/* AUDIO LENGTH */}
          <div className='text-zinc-800'>{duration}</div>
        </div>
      </section>
    }
    </>

  )
}

export default PlayerMobile;