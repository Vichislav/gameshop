'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import React from 'react';
import Task4 from './(components)/task4';
import Task3 from './(components)/task3';
import Task2 from './(components)/task2';



export default function Operators() {

  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };
  //className={`border-2 rounded p-2 border-gray-300 ${ isHighlighted ? 'animate-highlight' : ''}`}

  return (


    <section className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100 gree
        p-4">
      <Task2/>
      <Task3/>
      <Task4/>
      <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button>
    </section>



  );
}
