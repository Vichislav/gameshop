'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from "next/image";
import myPhoto from '../img/3.jpg'
import Link from 'next/link';


export default function About() {

  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };


  //grid-cols-1 md:grid-cols-2 lg:grid-cols-3

  return (
    <section className="flex flex-col w-[100%] items-center min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100">

      <div className='p-4  w-[100%] lg:w-[80%] flex-col justify-center justify-items-center'>

        <div className='grid w-full grid-cols-[100px_auto] lg:grid-cols-[200px_auto]  gap-2 mb-2'>

          <div className='rounded-lg max-w-[120px] lg:max-w-[200px] lg:row-span-2'>
            <Image
              className=' rounded-md'
              src={myPhoto}
              width={200}
              height={300}
              alt="Picture of the author"
            />
          </div>

          <div className='w-full rounded-lg bg-gradient-to-tr from-sky-200 to-sky-100'>
            <div className='bg-gradient-to-tr from-sky-300 to-sky-100 p-4 rounded-t-lg'>
              <h1 className="text-md lg:text-lg text-center">Привет меня зовут Вячеслав! </h1>
            </div>
            <div className='flex  flex-row w-full gap-4  p-4'>
              <h2 className='text-sm lg:text-md text-center'> Этот сайт я сделал для перезентационных и одновремено учебных целей. Сайт написан на Next.js, стилизация tailwind css.</h2>
            </div>
          </div>

          <div className='flex flex-col justify-start col-span-2 lg:col-span-1
            w-full gap-2 bg-gradient-to-tr from-sky-200 to-sky-100 rounded-t-lg text-sm lg:text-md'>
            <div className='bg-gradient-to-tr from-sky-300 to-sky-100 rounded-t-lg p-4'>
              <h2 className="text-md lg:text-lg">Основные навыки</h2>
            </div>
            <div className='flex  flex-row w-full gap-4  p-4'>
              <div className='flex flex-col w-[50%]'>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>React</li>
              </div>
              <div className='flex flex-col w-[50%]'>
                <li>Html, CSS</li>
                <li>Tailwind</li>
                <li>Next.js</li>
              </div>
            </div>
          </div>

        </div>

        <div className='flex flex-col justify-start 
            w-full gap-2 bg-gradient-to-tr from-sky-200 to-sky-100 rounded-t-lg text-sm lg:text-md mb-2'>
          <div className='bg-gradient-to-tr from-sky-300 to-sky-100 rounded-t-lg p-4'>
            <h2 className="text-md lg:text-lg">Примеры работы с API&#40;JSONPlaceholder&#41;</h2>
          </div>
          <div className='flex  flex-row w-full gap-4  p-2'>
            <div className='flex flex-col items-center w-[50%]'>
              
              <Link href={'/first'} className="rounded-lg my-2 flex  justify-center  items-center pl-4 pr-4 h-[30px] w-[50%] text-cyan-100 text-sm lg:text-md
                bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">Authors</Link>
            </div>
            <div className='flex flex-col items-center w-[50%]'>
              <Link href={'/posts'} className="rounded-lg my-2 flex  justify-center  items-center pl-4 pr-4 h-[30px] w-[50%] text-cyan-100 text-sm lg:text-md
                bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">Posts</Link>

            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row w-full gap-2 mb-2 text-sm lg:text-md'>

          <div className='w-full rounded-lg bg-gradient-to-tr from-sky-200 to-sky-150'>
            <div className='bg-gradient-to-tr from-sky-300 to-sky-200 p-2 rounded-t-lg'>
              <h1 className="text-md lg:text-lg text-start">Работал над сайтом магазина &quot;Удачный огород&quot;</h1>
            </div>
            <div className='flex  flex-col w-full gap-4  p-4'>
              <h2> В мои обязанности входило:</h2>
              <li>создание и наполнение логикой новых компонентов,</li>
              <li>настройка взаимодействия и обмена данными между компонентами,</li>
              <li>адаптация предлагаемой &#40;medusa.js&#41; последовательности работы некоторых компонентов под требования заказчика,</li>
              <li>адаптивная верстка страниц согласно макету в Figma,</li>
              <li>рефакторинг верстки джуна &#40;стажёра&#41;</li>
              <li>работа с API:</li>
              <ul className='pl-4'>
                <li>1. отображение данных с сервера  &#40;основной список товаров, разделение их по категориям&#41;,</li>
                <li>2. логика создания/наполнение корзины,</li>
                <li>3. создание/оформление заказа.</li>
              </ul>
            </div>
          </div>

          <div className='w-full rounded-lg bg-gradient-to-tr from-sky-200 to-sky-150'>
            <div className='bg-gradient-to-tr from-sky-300 to-sky-200 p-2 rounded-t-lg'>
              <h1 className="text-md lg:text-lg text-start">Работал над шаблоном сайта магазина по типу &quot;Донер 42&quot;</h1>
            </div>
            <div className='flex  flex-col w-full gap-4  p-4'>
              <h2> В мои обязанности входило:</h2>
              <li>создание и наполнение логикой новых компонентов,</li>
              <li>настройка взаимодействия и обмена данными между компонентами,</li>
              <li>адаптивная верстка страниц согласно макету в Figma,</li>
              <li>работа с API:</li>
              <ul className='pl-4'>
                <li>1. отображение данных с сервера  &#40;основной список товаров, разделение их по категориям&#41;,</li>
                <li>2. логика создания/наполнение корзины,</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button>
    </section>
  );
}
