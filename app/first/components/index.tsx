'use client'
 
import { useEffect, useState } from 'react'
import { User } from '../page'
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks'
import { addUserToGroup } from '@/lib/features/group/group.slice';

interface UserListProps {
    dataProps: User[];
  }

export default function Grid ({ dataProps }: UserListProps)  {

    const [data, setData] = useState<User[] | null>(null)
    const router = useRouter(); 

    const goToBasket = () => { 
        router.push('/basket'); 
    }; 
    
    const store = useAppStore()
    const dispatch = useAppDispatch()

    const addUser = (item: User) => {
      store.dispatch(addUserToGroup(item))
      console.log('dispatch work with ' + item.name)
    }
   
    useEffect(()=>{
        setData(dataProps)
    }, [dataProps])
    

  return (
    <div className="flex flex-col items-center justify-between p-[5px] w-full">
      <h1 className="text-[50px]">Grid for data</h1>
        <div className=' w-[80%] grid grid-cols-3 justify-center justify-items-center'>
          {data && data.map((item)=>{
            return(
            <div className='p-[10px] m-[10px] w-[80%] border-2 border-black rounded-lg' key={item.id}>
                <p>{item.name}</p>
                <button onClick={() => {addUser(item)}} className='w-[40px] h-[20px] border-2 border-blue-500 m-2 flex justify-center items-center rounded'>+</button> 
              </div>) 
          })}
        </div>
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToBasket}>to Basket</button>
    </div>
  );
}