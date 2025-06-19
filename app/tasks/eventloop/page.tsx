'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';
import React from 'react';
import EventTask1 from './(components)/eventtask1';





export default function EventLoopTask() {


  return (
    

      <section className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100 gree
        p-4">

        <h1 className=' text-center' >Задачи по EventLoop</h1>
        <EventTask1/>
      </section>

    

  );
}
