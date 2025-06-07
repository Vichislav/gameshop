'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';
import React from 'react';





export default function TasksStart() {


  return (


    <section className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100 gree
        p-4">

      <h1 className=' text-center' >
        Здесь Вы можете ознакомится с кратким изложением теории по операторам в javaScript и
        eventLoop, а на вкладках operators и eventloop можете закрепить и проверить свои знания.
      </h1>

      <div className='flex w-full flex-col gap-4 items-center'>
        <div className='border-b-2 border-gray-600 text-left w-full'>operators</div>

        <div className='flex w-full border-b-2 border-gray-600 border-dashed pb-1'>
          <div className='w-[10%] lg:w-[20%]'>
            <p className='text-sm lg:text-lg'>&&</p>
          </div>
          <div className='w-[90%] lg:w-[80%]'>
            <p className='text-sm lg:text-lg'>Оператор && &#40;логическое "и"&#41;
              - Возвращает первое ложное значение, если такое есть, иначе возвращает последнее значение.
              - Используется для проверки, что все условия истинны.
              - Если первое значение ложное &#40;falsy&#41;, то оно будет возвращено, и последующие значения не будут проверяться. <br />
              Ложное значение — это значение, которое в контексте логических операций рассматривается как "ложь".
              В JavaScript и многих других языках программирования к ложным значениям относятся: false, 0, undefinded, null, NaN, '' - пустая строка
              В примере ниже ложные значения будут <span className='text-red-600'>красного</span> цвета,
              истенные <span className='text-green-500'>зеленого</span> цвета.
            </p>
          </div>
        </div>

        <div className='w-full flex flex-col items-center border-b-2 border-gray-600 pb-1'>
          <div className='grid grid-cols-3 w-[60%] '>

            <div className='flex justify-center gap-1'>
              <p className='text-green-500'>2</p>
              <p className=''>&&</p>
              <p className='text-green-500'>3</p>
            </div>
            <div className='text-center'>return</div>
            <div className='text-center text-green-500'>3</div>

            <div className='flex justify-center gap-1'>
              <p className='text-red-600'>0</p>
              <p className=''>&&</p>
              <p className='text-green-500'>3</p>
            </div>
            <div className='text-center'>return</div>
            <div className='text-center text-red-600'>0</div>

            <div className='flex justify-center gap-1'>
              <p className='text-green-500'>3</p>
              <p className=''>&&</p>
              <p className='text-red-600'>null</p>
            </div>
            <div className='text-center'>return</div>
            <div className='text-center text-red-600'>null</div>

            <div className='flex justify-center gap-1'>
              <p className='text-red-600'>0</p>
              <p className=''>&&</p>
              <p className='text-red-600'>null</p>
            </div>
            <div className='text-center'>return</div>
            <div className='text-center text-red-600'>0</div>

          </div>
        </div>

        <div className='flex w-full border-b-2 border-gray-600 border-dashed pb-1'>
          <div className='w-[10%] lg:w-[20%]'>
            <p className='text-sm lg:text-lg'>||</p>
          </div>
          <div className='w-[90%] lg:w-[80%]'>
            <p className='text-sm lg:text-lg'>Оператор || &#40;логическое "или"&#41;

              - Возвращает первое истинное значение, если такое есть, иначе возвращает последнее значение.
              - Применяется для проверки нескольких условий.
              - Если первое значение истинное &#40;truthy&#41;, то оно будет возвращено, и последующие значения не будут проверяться. </p>
          </div>
        </div>

        <div className='w-full flex flex-col items-center border-b-2 border-gray-600 pb-1'>
          <div className='grid grid-cols-3 w-[90%] lg:w-[60%]'>

            <div className='flex justify-center gap-1'>
              <p className='text-green-500'>2</p>
              <p className=''>||</p>
              <p className='text-green-500'>3</p>
            </div>
            <div className='text-center'>return</div>
            <div className='text-center text-green-500'>2</div>

            <div className='flex justify-center gap-1'>
              <p className='text-red-600'>0</p>
              <p className=''>||</p>
              <p className='text-green-500'>3</p>
            </div>
            <div className='text-center'>return</div>
            <div className='text-center text-green-500'>3</div>

            <div className='flex justify-center gap-1'>
              <p className='text-green-500'>3</p>
              <p className=''>||</p>
              <p className='text-red-600'>null</p>
            </div>
            <div className='text-center'>return</div>
            <div className='text-center text-green-500'>3</div>

            <div className='flex justify-center gap-1'>
              <p className='text-red-600'>0</p>
              <p className=''>||</p>
              <p className='text-red-600'>null</p>
            </div>
            <div className='text-center'>return</div>
            <div className='text-center text-red-600'>null</div>

          </div>
        </div>

      </div>
    </section>



  );
}
