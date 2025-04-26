'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';
import React from 'react';
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks'
import { removeUserToGroup } from '@/lib/features/group/group.slice';
import { User } from "../first/page";


interface Item {
  id: number;
  text: string;
}



export default function Basket() {


  const router = useRouter();

  const [data, setData] = useState<Item[]>([
    { id: 0, text: '>' },
    { id: 1, text: '&&' },
    { id: 2, text: '||' },
    { id: 3, text: '...' },
    { id: 4, text: '...' },
    { id: 5, text: '...' },
  ]);

  // Сохраняем id перетаскиваемого элемента
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [solving, setSolving] = useState<boolean>(false)

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, item: Item) => {
    setCurrentItem(item)    
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // обязательно, чтобы разрешить drop
    //e.dataTransfer.dropEffect = 'move';
    const target = e.target as HTMLDivElement; // приведение типа
    target.style.background = 'lightgray';
    
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, item: Item) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement; // приведение типа
    target.style.background = '#f0f0f0';
    setData(data.map(el=>{
      if(currentItem) {
        if(el.id === item.id) {
          return {...el, id: currentItem.id}
        }
        if(el.id === currentItem.id) {
          return {...el, id: item.id}
        }
      }
      return el
    }));
  };

  const sortElem = (a: Item, b: Item) => {
      if(a.id > b.id) {
        return 1
      }else {
        return -1 
      }
  }

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement; // приведение типа
    target.style.background = 'white';
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement; // приведение типа
    target.style.background = 'white';
  };

  useEffect(()=>{
  
    const expression = `1&&9>2||2`;
    const currentSolving = `1${data[3].text}9${data[4].text}2${data[5].text}2`
    if (currentSolving === expression) {
      setSolving(true);
      
    }else{
      setSolving(false);
    }
  }, [onDrop])

  const goToHome = () => {
    router.push('/');
  };


  return (
    <section className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
    min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100 gree
    p-4">

      <h1 className=' text-center' >Переместите элементы справа на места с "..." таким образом что бы выражение в итоге возвращало true</h1>
      
      <div className='w-[80%] flex items-center gap-[10px] border-2  border-black rounded-lg p-5'
      style={{ backgroundColor: solving ? '#7efca0' : 'white' }}
      >

        <div className='flex flex-col border-r-2 w-[40px] border-black gap-2'>
          {data.sort(sortElem).slice(0, 3).map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={e => onDragStart(e, item)}
              onDragOver={onDragOver}
              onDrop={e => onDrop(e, item)}
              onDragEnd={e => onDragEnd(e)}
              onDragLeave={e => onDragLeave(e)}
              className='flex justify-center items-center w-[35px] border-2 border-black rounded-lg cursor-grab'
            >
              {item.text}
            </div>
          ))}
        </div>

        <div className='flex h-[33%] gap-[30px]'>            
              <div className='flex justify-center items-center w-[35px] rounded-lg bg-white'>
                <p>1</p>
              </div>
              <div className='flex justify-center items-center w-[35px] rounded-lg bg-white'>
                <p>9</p>
              </div>
              <div className='flex justify-center items-center w-[35px] rounded-lg bg-white'>
                <p>2</p>
              </div>
              <div className='flex justify-center items-center w-[35px] rounded-lg bg-white'>
                <p>2</p>
              </div>     
        </div>

        <div className='absolute flex  gap-[30px] z-10 translate-x-[85px]'>
          {data.slice(3).map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={e => onDragStart(e, item)}
              onDragOver={onDragOver}
              onDrop={e => onDrop(e, item)}
              onDragEnd={e => onDragEnd(e)}
              onDragLeave={e => onDragLeave(e)}
              className='flex justify-center items-center w-[35px] border-2 border-black rounded-lg cursor-grab'
              style={{ backgroundColor: draggedId === item.id ? '#f0f0f0' : 'white' }}
            >
              {item.text}
            </div>
          ))}
        </div>
        {solving && <div className=' p-2'>true!</div>}
      </div>
      <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button>
    </section>
  );
}
