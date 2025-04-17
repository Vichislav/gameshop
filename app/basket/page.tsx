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
    { id: 1, text: 'Элемент 1' },
    { id: 2, text: 'Элемент 2' },
    { id: 3, text: 'Элемент 3' },
  ]);

  // Сохраняем id перетаскиваемого элемента
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // обязательно, чтобы разрешить drop
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    if (draggedId === null) return;

    if (draggedId === id) return; // если отпустил над тем же элементом — ничего не делаем

    // меняем порядок: находим индексы
    const draggedIndex = data.findIndex(item => item.id === draggedId);
    const dropIndex = data.findIndex(item => item.id === id);

    const newData = [...data];
    // удаляем перетаскиваемый элемент
    const [draggedItem] = newData.splice(draggedIndex, 1);
    // вставляем его на новую позицию
    newData.splice(dropIndex, 0, draggedItem);

    setData(newData);
    setDraggedId(null);
  };

  const onDragEnd = () => {
    setDraggedId(null);
  };


 
  const goToHome = () => { 
      router.push('/'); 
  }; 


  return (
    <section className="flex flex-col w-[100%] gap-[20px] justify-center items-center min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100">
      <h1 className="text-[50px]">Grid for data</h1>
        <div className=' w-[80%] grid grid-cols-1 justify-center justify-items-center'>
        {data.map(item => (
        <div
          key={item.id}
          draggable
          onDragStart={e => onDragStart(e, item.id)}
          onDragOver={onDragOver}
          onDrop={e => onDrop(e, item.id)}
          onDragEnd={onDragEnd}
          className='p-[10px] m-[10px] w-[80%] border-2 border-black rounded-lg cursor-grab'
          style={{ backgroundColor: draggedId === item.id ? '#f0f0f0' : 'white' }}
        >
          <p>{item.text}</p>
        </div>
      ))}
        </div>
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button> 
    </section>
  );
}
