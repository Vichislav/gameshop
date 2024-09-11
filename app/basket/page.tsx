'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';
import React from 'react';
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks'
import { removeUserToGroup } from '@/lib/features/group/group.slice';
import { User } from "../first/page";


export default function Basket() {
  
  //const [data, setData] = useState<User[] | null>(null)
  const router = useRouter(); 

  const data = useAppSelector((state)=>state.group)
  console.log(typeof data)
  console.log(data)


  const store = useAppStore()
  const dispatch = useAppDispatch()

  const goToHome = () => { 
      router.push('/'); 
  }; 

  const removeUser = (item: User) => {
    store.dispatch(removeUserToGroup(item.id))
    console.log('dispatch work with ' + item.name)
  }


  return (
    <section className="flex flex-col w-[100%] gap-[20px] mt-[20px] justify-center items-center min-h-screen min-w-[100%] bg-slate-700">
      <h1 className="text-[50px]">Grid for data</h1>
        <div className=' w-[80%] grid grid-cols-1 justify-center justify-items-center'>
          {data && data.group.map((item)=>{
            return(
            <div className='p-[10px] m-[10px] w-[80%] border-2 border-black rounded-lg' key={item.id}>
                <p>{item.name}</p>
                <button onClick={() => {removeUser(item)}} className='w-[40px] h-[20px] border-2 border-blue-500 m-2 flex justify-center items-center rounded'>-</button> 
              </div>) 
          })}
        </div>
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button> 
    </section>
  );
}
