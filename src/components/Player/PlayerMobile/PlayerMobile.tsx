"use client";
import React, { useState, useRef, useEffect } from 'react'
import { MdOutlineSkipPrevious,  MdOutlineSkipNext, MdPlayArrow, MdOutlinePause, MdOutlineArrowRightAlt  } from "react-icons/md";
import { RiLoopLeftFill } from "react-icons/ri";
import { GoUnmute, GoMute } from "react-icons/go";
import Image from 'next/image';
import { IoArrowDownSharp } from 'react-icons/io5';
import { FaMinus, FaPlus } from 'react-icons/fa';

type DbType = {
  numOfSongs: number;
  [key: number]: {
    name: string;
    artist: string;
    pic: string;
    bg: string;
    url: string;
  };
};

const PlayerMobile = ({hideFooter} : any) => {
  //STATES
  const [fullSize, setFullSize] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("00:00");
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [audioSaved, setAudioSaved] = useState(false);
  const [audioId, setAudioId] = useState<number>(0);
  const [currentDuration, setCurrentDuration] = useState("00:00");

  const db: DbType = {
    numOfSongs: 2,
    0:{
      name:"Chilled",
      artist:"John Cooper",
      pic: "https://chillstation.s3.amazonaws.com/public/500x500.jpg",
      bg: "https://media.tenor.com/5f3s1LEfRb4AAAAC/living-wallpaper-moving-wallpaper.gif",
      url: "https://chillstation.s3.amazonaws.com/public/Midnight-Stroll-Lofi-Study-Music(chosic.com).mp3",
    },
    1:{
      name:"Smooth Sail",
      artist:"Lofizero",
      pic: "https://chillstation.s3.amazonaws.com/public/modern-pop-lofi-music-cover-art-design-template-f6db8ab55ee30bac80c523b3129a268d_screen.jpg",
      bg: "https://media.tenor.com/3F5XmYhEARwAAAAd/chill-japan.gif",
      url: "https://chillstation.s3.amazonaws.com/public/purrple-cat-green-tea(chosic.com).mp3",
    },
  }

  //REFS
  const audioRef : any = useRef(null);
  const trackRef : any = useRef(null);
  const animationRef : any = useRef(null);

  //SIDE EFFECTS
  useEffect(() => {
  const audioSizeInSeconds = audioRef?.current?.duration;
  trackRef.current.max = audioSizeInSeconds;

  const audioLength = calculateTime(audioSizeInSeconds);
  setDuration(audioLength);

  },[audioRef?.current?.loadedMetadata, audioRef?.current?.readyState, audioId])


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
         nextAudio();
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

  const toggleVideo = () => {
    
    setPlayVideo(!playVideo);
    hideFooter();
    
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
    setAudioId(audioId !== db.numOfSongs-1 ? audioId + 1 : 0);
    trackRef.current.value = 0;
    setCurrentDuration("00:00");
    if(!isPlaying){
      audioRef.current.autoplay = false;
    }
    else{
      audioRef.current.autoplay = true;
    }
  }
  const previousAudio = () => {
    if(audioRef.current.currentTime > 5){
        audioRef.current.currentTime = 0;
        trackRef.current.value = 0;
    }
    else{
      setAudioId(audioId !== 0 ? audioId - 1 : db.numOfSongs-1);
      trackRef.current.value = 0;
      setCurrentDuration("00:00");
      if(!isPlaying){
        audioRef.current.autoplay = false;
      }
      else{
        audioRef.current.autoplay = true;
      }
    }
  }

  return (
    <>
      
      <audio ref={audioRef} preload='metadata' src={db[audioId].url}></audio>

       {/* FULL PLAYER */}
      <section style={{ backgroundImage: `url("${db[audioId].bg}")` }} className={`${!fullSize && 'translate-y-[100%] opacity-0'} z-[9999] transition-all fixed min-h-full bottom-[0px] w-screen gap-4 saturate-75
       bg-cover bg-center backdrop-opacity-25 justify-center items-center flex flex-col md:hidden`}>

          <div className={`${playVideo && 'opacity-0 pointer-events-none'} transition-all flex flex-col m-auto justify-center items-center `}>
              <div className={` bg-pink-400/25 w-full h-full fixed z-[-1]`}></div>
              <Image onClick={toggleVideo} priority src={db[audioId].pic} className='max-w-[70vw] -translate-y-[140px] hover:scale-[1.02] cursor-pointer 
              transition-all w-[300px] h-auto shadow-lg shadow-black/50 rounded-md' width={1500} height={1500} alt={"Song cover-art."}></Image>
               <button onClick={toggleFullsize} className='absolute top-2 left-2 text-3xl backdrop-blur-lg bg-black/25 rounded-lg text-white z-[9999]'><IoArrowDownSharp /></button>
          </div>
         

         {playVideo && <div onClick={toggleVideo} className='bg-transparent w-full h-full fixed'></div>}

        {/* GRAIN */}
        <div className='bg-[url("https://i.pinimg.com/originals/c7/4c/60/c74c608d6887a8ef40c1674c07cdf928.gif")] opacity-[0.1] w-full h-full fixed z-[-1]'></div>   
        {/* CONTROLS */}   
        <div className={`${playVideo && "translate-y-[30%] opacity-0 pointer-events-none"} transition-all fixed bottom-[70px] flex flex-col gap-4 justify-center items-center w-full bg-black/25 backdrop-blur-sm`}>

          <p className=' text-whit rounded-2xl text-xl px-2 text-white py-2'>{db[audioId].name} - {db[audioId].artist}</p>
          <div className='flex justify-evenly items-center max-w-[95vw] w-full'>
             {/* LOOP */}
             <button onClick={toggleLoop} className='w-10 h-10 rounded-xl backdrop-blur-sm text-white  flex justify-center items-center text-2xl 
            hover:bg-transparent  lg:hover:border-2  transition-all'>{isLooping ? <RiLoopLeftFill /> : <MdOutlineArrowRightAlt /> }</button>
            {/* PREVIOUS */}
            <button onClick={previousAudio} className='w-10 h-10 rounded-xl  flex justify-center items-center text-3xl  text-white
            hover:bg-transparent lg:hover:border-2 border-fuchsia-500 backdrop-blur-sm transition-all'><MdOutlineSkipPrevious/></button>
            {/* PLAY */}
            <button onClick={togglePlay} className='w-14 h-14 rounded-xl flex justify-center items-center text-5xl 
            hover:bg-transparent  lg:hover:border-2 border-fuchsia-500 backdrop-blur-sm text-white  transition-all'>{!isPlaying ? <MdPlayArrow /> : <MdOutlinePause />}</button>
            {/* NEXT */}
            <button onClick={nextAudio} className='w-10 h-10 rounded-xl  flex justify-center items-center text-3xl
            hover:bg-transparent  lg:hover:border-2 border-fuchsia-500 backdrop-blur-sm text-white  transition-all'><MdOutlineSkipNext/></button>
             {/* MUTE */}
             <button onClick={toggleMuted} className='w-10 h-10 rounded-xl backdrop-blur-sm text-white  flex justify-center items-center text-2xl
            hover:bg-transparent lg:hover:border-2 transition-all'>{!isMuted ? <GoUnmute /> : <GoMute />}</button>
          </div>

          <div className='flex w-full gap-4 justify-center items-center  pb-4'>
            {/* AUDIO CURRENT TIME */}
            <div className=' text-white '>{currentDuration}</div>
            {/* TRACK */}
            <input ref={trackRef} onChange={moveTrack} defaultValue={"0"} className='w-[50%] range bg-fuchsia-200 appearance-none rounded-md cursor-pointer accent-fuchsia-800' type="range" name="" id="" />
            {/* AUDIO LENGTH */}
            <div className=' text-white '>{duration === "NaN:NaN" ? "--:--" : duration}</div>
          </div>
        </div>
      
      </section> 

      {/* MINI PLAYER */}
      <section onClick={toggleFullsize} className='fixed h-fit bottom-20 z-[-1] w-[98vw] rounded-md  backdrop-blur-sm bg-pink-400/50 justify-between gap-4 p-2 items-center flex md:hidden'>

        <div className='flex gap-4 justify-center items-center pl-2 w-[20%] '>
          {/* AUDIO CURRENT TIME */}
          <div className='text-zinc-800'>{currentDuration}</div>   
        </div>

        <div className='flex justify-end items-center gap-10  w-[80%]'>
        <p className=' rounded-2xl text-md text-zinc-800 text-center py-2'>{db[audioId].name}  <br/> {db[audioId].artist}</p>
           {/* Add to Lib */}
           <button onClick={(e) => { e.stopPropagation(); }} className='w-6 h-6 rounded-xl bg-green-600/75 backdrop-blur-md text-white  flex justify-center items-center text-2xl 
             lg:hover:border-2 transition-all'>{!audioSaved ? <FaPlus /> : <FaMinus /> }</button>
          {/* PLAY */}
          <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className='w-10 h-10 rounded-3xl bg-pink-500 flex justify-center items-center text-4xl  z-50
          hover:bg-transparent  hover:border-2 border-fuchsia-500 transition-all'>{!isPlaying ? <MdPlayArrow /> : <MdOutlinePause />}</button>
        </div>

      </section>
    
    </>

  )
}

export default PlayerMobile;