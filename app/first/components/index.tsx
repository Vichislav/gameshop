'use client'
 
import { useEffect, useState } from 'react'
import { User } from '../page'

interface UserListProps {
    dataProps: User[];
  }

export default function Grid ({ dataProps }: UserListProps)  {

    const [data, setData] = useState<User[] | null>(null)
    
    console.log('data')
    console.log(dataProps)
    useEffect(()=>{
        setData(dataProps)
    }, [dataProps])
    

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-[50px]">Grid for data</h1>
        {data && data.map((item)=>{
           return(<div>
                {item.name}
            </div>) 
        })}
    </main>
  );
}