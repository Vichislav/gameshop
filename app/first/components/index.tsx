'use client'
 
import { useEffect, useState } from 'react'
import { User } from '../page'
import { useRouter } from 'next/navigation';
import React from 'react';

interface UserListProps {
    dataProps: User[];
  }

export default function Grid ({ dataProps }: UserListProps)  {

    const [data, setData] = useState<User[] | null>(null)
    const router = useRouter(); 

    const goToBasket = () => { 
        router.push('/basket'); 
    }; 
    
    console.log('data')
    console.log(dataProps)
    useEffect(()=>{
        setData(dataProps)
    }, [dataProps])
    

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-[50px]">Grid for data</h1>
        {data && data.map((item)=>{
           return(<div key={item.id}>
                {item.name}
            </div>) 
        })}
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToBasket}>to Basket</button>
    </main>
  );
}