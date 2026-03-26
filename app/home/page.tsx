'use client'
import React from 'react'
import Image from 'next/image'
import mem from '../img/sm.png'
import Link from 'next/link'
import js from '../img/js.jpg'
import ts from '../img/ts.png'
import css from '../img/css.png'
import html from '../img/html.png'

/** Как «+ Новый вопрос» (indigo), без фиксации ширины на всю колонку — размеры задаём на ссылке */
const homeNavLinkClass =
  'rounded-md border border-indigo-400 bg-indigo-50 font-medium text-indigo-800 transition-colors hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'

export default function HomePage() {
  // grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  // bg-gradient-to-tr from-slate-300 to-slate-100
  return (
    <section className="flex flex-row w-[100%] items-start justify-center  min-w-[100%] ">
      <div className="w-[30%] hidden lg:flex h-full pt-6">
        <Image
          className="rounded-md animate-slideright-07"
          src={mem}
          alt="Picture of the author"
        />
      </div>
      <div className="pt-3 w-[80%] lg:w-[50%] lg:pt-10 h-full flex flex-col  justify-center  items-center gap-5">
        <div
          className="w-[90%] flex flex-col items-center rounded-lg bg-gradient-to-tr from-sky-200 to-sky-150 animate-slideIn-05
              transform transition duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          <div className="bg-gradient-to-tr from-sky-300 to-sky-200 p-2 rounded-t-lg w-full">
            <h1 className="text-sm md:text-md lg:text-lg text-start">
              Задачи на операторы и eventLoop 
            </h1>
          </div>
          <Link
            href={'/tasks'}
            className={`my-4 flex h-[30px] w-[50%] items-center justify-center px-4 text-sm lg:text-base ${homeNavLinkClass}`}
          >
            JS tasks
          </Link>
        </div>

        <div
          className="w-[90%] flex flex-col items-center rounded-lg bg-gradient-to-tr from-sky-200 to-sky-150 animate-slideIn-1
              transform transition duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          <div className="bg-gradient-to-tr from-sky-300 to-sky-200 p-2 rounded-t-lg w-full">
            <h1 className="text-sm md:text-md lg:text-lg text-start">
              Вопросы с собеседований
            </h1>
          </div>
          <Link
            href={'/questions'}
            className={`my-4 flex h-[30px] w-[50%] items-center justify-center px-4 text-sm lg:text-base ${homeNavLinkClass}`}
          >
            Questions
          </Link>
        </div>

       {/*  <div
          className="w-[90%] flex flex-col items-center rounded-lg bg-gradient-to-tr from-sky-200 to-sky-150 animate-slideIn-15
              transform transition duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          <div className="bg-gradient-to-tr from-sky-300 to-sky-200 p-2 rounded-t-lg w-full">
            <h1 className="text-sm md:text-md lg:text-lg text-start">
              Тут можно посмотреть информацию обо мне
            </h1>
          </div>
          <Link
            href={'/about'}
            className={`my-4 flex h-[30px] w-[50%] items-center justify-center px-4 text-sm lg:text-base ${homeNavLinkClass}`}
          >
            About
          </Link>
        </div> */}

        <div className="relative z-0 flex  justify-center items-center h-[200px] w-[100%]">
          <div className="absolute z-10 flex h-[80%] p-2 mb-5 items-start bg-white border-dashed border-2 border-black rounded-lg origin-bottom animate-swingL-1">
            <Image className="" width={25} height={25} src={js} alt="js icon" />
          </div>

          <div className="absolute z-20 flex h-[100%] p-2 mb-5 items-start bg-white border-dashed border-2 border-black rounded-lg origin-bottom animate-swingL05-1">
            <Image
              className=""
              width={25}
              height={25}
              src={css}
              alt="css icon"
            />
          </div>

          <div className="absolute z-10 flex h-[100%] p-2 mb-5 items-start bg-white border-dashed border-2 border-black rounded-lg origin-bottom animate-swingR05-1">
            <Image
              className=""
              width={25}
              height={25}
              src={html}
              alt="html icon"
            />
          </div>

          <div className="absolute z-20 flex h-[80%] p-2 mb-5 items-start bg-white border-dashed border-2 border-black rounded-lg origin-bottom animate-swingR-1">
            <Image className="" width={25} height={25} src={ts} alt="ts icon" />
          </div>

          <div className="absolute z-30 flex justify-center items-center p-2 self-end  rounded-t-[50px] bg-white rounded-b-[25px] w-[100px] h-[80px] border-dashed border-2 border-black">
            <h2>tvjs.ru</h2>
          </div>
        </div>
      </div>
    </section>
  )
}
