'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import React from 'react';

interface IProduct {
  name: string,
  count: number,
  price: number,
}



const products: IProduct[] = [
  { name: "banana", count: 2, price: 1000 },
  { name: "banana", count: 2, price: 1000 },
  { name: "arbuz", count: 2, price: 1000 },
  { name: "arbuz", count: 4, price: 100 },
  { name: "arbuz", count: 2, price: 100 },
  { name: "apple", count: 7, price: 333 },
  { name: "apple", count: 8, price: 22 },
  { name: "apple", count: 9, price: 22 },
];


const filtredProducts = (products: IProduct[]) => {
  const newObj: Record<string, IProduct[]> = {}

  products.forEach((item: IProduct) => {
    if(newObj.hasOwnProperty(item.name)) {
      newObj[item.name][0].count += item.count
      newObj[item.name][0].price += item.price
    }else{
      newObj[item.name] = [item]
    }
  })
  return newObj
}

const filterObj = filtredProducts(products)


export default function Example() {

  const [show, setShow] = useState<boolean>(false)
  const [arr, setArr] = useState<IProduct[][]>(Object.values(filterObj))
  const [totalCost, setTotalCost] = useState<number>(0)

  const handleCheckbox = () => {
      setShow(prev => !prev)
  }
  const router = useRouter(); 

  const goToHome = () => { 
      router.push('/'); 
  }; 

  useEffect(()=>{
    
    if(!show) {

      setArr(Object.values(filterObj))
      setTotalCost(Object.values(filterObj).reduce((total, item) => total + item[0].price, 0))
    }else{
      setArr(Object.values(filterObj).filter((item)=> item[0].name === "banana"))
      setTotalCost(Object.values(filterObj).filter((item)=> item[0].name === "banana").reduce((total, item) => total + item[0].price, 0))
    }
    
  }, [show])


  return (
    <section className="flex flex-col w-[100%] gap-[20px] mt-[20px] justify-center items-center min-h-screen min-w-[100%] bg-slate-700">
      <h1 className="text-[50px]">Example Page</h1>
        <div className=' w-[80%] grid grid-cols-1 justify-center justify-items-center'>
          <div>
            <label>Show only banana</label>
            <input type='checkbox' checked={show} onChange={handleCheckbox}></input>
          </div>
          Example data
         {arr?.map((item: IProduct[]) => {
            return(
              <div key={item[0].name}>
                <p> Продукт: {item[0].name}</p>
                <p> Цена{item[0].price}</p>
                <p>Колличество {item[0].count}</p>
              </div>
            )
         })}
         <h1>Total price</h1>
         <p>{totalCost}</p>
        </div>
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button> 
    </section>
  );
}
