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

/*     const goToBasket = () => { 
        router.push('/basket'); 
    }; 

    const goToExample = () => { 
      router.push('/example'); 
  }; 

  const goToPosts = () => { 
    router.push('/posts'); 
};  */
   
    useEffect(()=>{
        setData(dataProps)
    }, [dataProps])
    

  return (
    <div className="flex flex-col items-center justify-between p-[5px] w-full">
      <h1 className=" text-lg pt-[10px]">Please select the author</h1>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center
        w-[100%] md:w-[80%] 
        '>
          {data ? data.map((user)=>{
            return(
              <ItemComponent item={user} key={user.id}/>
              )
          }): <h2 className=" text-lg pt-[10px]">Sorry data not found</h2>}
        </div>
        {/* <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToBasket}>to Basket</button>
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToExample}>to Example</button>
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToPosts}>to Posts</button> */}
    </div>
  );
}