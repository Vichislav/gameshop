'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from "next/image";
import mem from '../img/sm.png'
import Link from 'next/link';


export default function HomePage() {

  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };


  //grid-cols-1 md:grid-cols-2 lg:grid-cols-3

  return (
    <section className="flex flex-row w-[100%] items-start  min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100">
      <div className='w-[40%] md:w-[50%] flex h-full'>
        <Image
          className='rounded-md animate-blink-1'
          src={mem}
          alt="Picture of the author"
        />
      </div>
      <div className='mt-[1%] w-[60%] md:w-[50%] md:mt-[10%] h-full flex flex-col  justify-center  items-center gap-3'>

              

              <div className='w-[90%] flex flex-col items-center rounded-lg bg-gradient-to-tr from-sky-200 to-sky-150 animate-slideIn-05'>
                <div className='bg-gradient-to-tr from-sky-300 to-sky-200 p-2 rounded-t-lg '>
                  <h1 className="text-md lg:text-lg text-start">Здесь вы можете порешать задачи, которые встречались мне на собеседованиях либо подобные им</h1>
                </div>
                <Link href={'/tasks'} className="rounded-lg my-4 flex  justify-center  items-center pl-4 pr-4 h-[30px] w-[50%] text-cyan-100 text-sm lg:text-md
                bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">JS tasks</Link>
              </div>

              

              <div className='w-[90%] flex flex-col items-center rounded-lg bg-gradient-to-tr from-sky-200 to-sky-150 animate-slideIn-1'>
                <div className='bg-gradient-to-tr from-sky-300 to-sky-200 p-2 rounded-t-lg '>
                  <h1 className="text-md lg:text-lg text-start">Тут можно посмотреть информацию обо мне</h1>
                </div>
                <Link href={'/about'} className="rounded-lg my-4 flex  justify-center  items-center pl-4 pr-4 h-[30px] w-[50%] text-cyan-100 text-sm lg:text-md
                bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">About</Link>
              </div>

               

               
      </div>

    </section>
  );
}
