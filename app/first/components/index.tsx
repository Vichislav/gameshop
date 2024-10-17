'use client'
 
import { useEffect, useState } from 'react'
import { User } from '../page'
import { useRouter } from 'next/navigation';
import React from 'react';
import ItemComponent from './item';

interface UserListProps {
    dataProps: User[];
  }

export default function Grid ({ dataProps }: UserListProps)  {

    const [data, setData] = useState<User[] | null>(null)
    const router = useRouter(); 

    const goToBasket = () => { 
        router.push('/basket'); 
    }; 
   
    useEffect(()=>{
        setData(dataProps)
    }, [dataProps])
    

  return (
    <div className="flex flex-col items-center justify-between p-[5px] w-full">
      <h1 className="text-[50px]">Grid for data</h1>
        <div className=' w-[80%] grid grid-cols-3 justify-center justify-items-center'>
          {data && data.map((user)=>{
            return(
              <ItemComponent item={user}/>
              )
          })}
        </div>
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToBasket}>to Basket</button>
    </div>
  );
}