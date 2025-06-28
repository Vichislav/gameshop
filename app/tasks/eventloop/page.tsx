'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';
import React from 'react';
import EventTask1 from './(components)/eventtask1';
import EventTask2 from './(components)/eventtask2';
import EventTask3 from './(components)/eventtask3';





export default function EventLoopTask() {


  return (
    

      <section className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100 gree
        p-4">

        <h1 className=' text-center' >Задачи по EventLoop</h1>
        <EventTask1/>
        <EventTask2/>
        <EventTask3/>
      </section>

    

  );
}
