'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from "next/image";
import myPhoto from '../img/3.jpg'


export default function About() {

  const router = useRouter(); 

  const goToHome = () => { 
      router.push('/'); 
  }; 




  return (
    <section className="flex flex-col w-[100%] gap-[20px] items-center min-h-screen min-w-[100%] bg-slate-700">
      
        <div className='p-4  w-[80%] grid grid-cols-2 justify-center justify-items-center'>
            <Image
                className=' rounded-md'
                src={myPhoto}
                width={200}
                height={300}
                alt="Picture of the author"
            />
          <h1 className="text-lg">Hi, I'm Vyacheslav, and this is my website for repeating the material.</h1>
          <div className='pt-2'>
            Data
          </div>
          <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button> 
        </div>
    </section>
  );
}
