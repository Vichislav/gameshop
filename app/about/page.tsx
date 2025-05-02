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
    <section className="flex flex-col w-[100%] items-center min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100">
      
        <div className='p-4  w-[80%] flex-col justify-center justify-items-center'>

          <div className='grid w-full grid-cols-[200px_auto]  gap-2 mb-2'>
            
            <div className='rounded-lg max-w-[200px] row-span-2'>
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
                  <h1 className="text-lg text-center">Привет меня зовут Вячеслав! </h1>
              </div>
              <div className='flex  flex-row w-full gap-4  p-4'>
               <h2> Этот сайт я сделал для перезентационных и одновремено учебных целей. Сайт написан на Next.js, стилизация tailwind css.</h2>
              </div>
            </div>

            <div className='flex flex-col justify-start 
            w-full gap-2 bg-gradient-to-tr from-sky-200 to-sky-100 rounded-t-lg'>
              <div className='bg-gradient-to-tr from-sky-300 to-sky-100 rounded-t-lg p-4'>
                <h2>Основные навыки</h2>
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
         
          <div className='flex w-full gap-2 mb-2'>
            <div className='w-full rounded-lg bg-gradient-to-tr from-sky-200 to-sky-150'>
                <div className='bg-gradient-to-tr from-sky-300 to-sky-200 p-2 rounded-t-lg'>
                  <h1 className="text-lg text-start">Работал над сайтом магазина "Удачный огород"</h1>
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
                  <h1 className="text-lg text-start">Работал над сайтом магазина "Удачный огород"</h1>
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
          </div>
          
        </div>
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button> 
    </section>
  );
}
