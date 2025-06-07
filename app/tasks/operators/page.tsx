'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import React from 'react';

interface Item {
  id: number;
  text: string;
}


export default function Operators() {


  const router = useRouter();



  // Сохраняем id перетаскиваемого элемента

  const [currentValue, setCurrentValue] = useState<string>('');
  const [leftActive, setLeftActive] = useState<boolean>(false) //подсветить ли поле выбора элементов
  const [rightActive, setRightActive] = useState<boolean>(false) //подсветить ли основное выражение, куда вставлять значение
  const [isSetValue, setIsSetValue] = useState<boolean>(false) //задано ли текущие значение
  const [solving, setSolving] = useState<boolean>(false)// верно ли решено задание
  //one two three
  const [data, setData] = useState<string[]>(['...', '...', '...']);
  const [borederChange, setBorderChange] = useState<boolean[]>([false, false, false])

  const itemHandler = (str: string, ind: number) => {
    setCurrentValue(str)//берем с кнопки текущее значение оператора
    setBorderChange(() => {
      const newArr = [false, false, false]
      newArr[ind] = true
      return newArr
    })
    setRightActive(true) //подсвечиваем правую часть зеленым
    setIsSetValue(true) // говорим о том что значение взято
    setTimeout(() => setRightActive(false), 1000);
  }

  const dataHandler = (index: number) => {
    
    //если значение оператора утсановлено то 
    if (isSetValue) {
      //устанавливаем значение по индексу
      setData(data => {
        const newData = [...data]
        newData[index] = currentValue
        return newData
      })
      //убираем флаг того, что значение оператора выбрано
      setIsSetValue(false)
      //убираем текущие значение оператора 
      setCurrentValue('...')
      //убираем выделение с кнопки панели выбора оператора
      setBorderChange(() => {
        const newArr = [false, false, false]
        return newArr
      })
    }else { //если значение я нет подсвечиваем операторы красным
      setLeftActive(true)
      setTimeout(() => setLeftActive(false), 1000);
    }

  }



  useEffect(() => {

    const expression = `1&&9>2||2`;
    const currentSolving = `1${data[0]}9${data[1]}2${data[2]}2`
    console.log(currentSolving)
    if (currentSolving === expression) {
      setSolving(true);

    } else {
      setSolving(false);
    }
  }, [data])

  const goToHome = () => {
    router.push('/');
  };
  //className={`border-2 rounded p-2 border-gray-300 ${ isHighlighted ? 'animate-highlight' : ''}`}

  return (


    <section className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100 gree
        p-4">

      <h1 className=' text-center' >Переместите элементы справа на места слева &quot;_&quot; таким образом что бы выражение в итоге возвращало true</h1>

      <div className='w-[100%] lg:w-[80%] flex flex-col lg:flex-row items-center gap-[10px] border-2  border-black rounded-lg p-5'
        style={{ backgroundColor: solving ? '#7efca0' : 'white' }}
      >

        <div className='flex flex-row border-b-2 lg:flex-col lg:border-r-2 lg:border-b-0 w-[90%] lg:w-[60px] border-black gap-6 lg:gap-2 justify-center  p-2'>

          <div className={`flex justify-center items-center w-[45px] h-[45px]  rounded-lg 
              cursor-pointer ${borederChange[0] ? 'border-2 border-dashed border-gray-600 bg-[#dde4ec]' : 'border-2 border-black bg-white'}
              ${leftActive ? 'animate-redlight' : ''}`}
            onClick={() => itemHandler('>', 0)}>
            &gt;
          </div>
          <div className={`flex justify-center items-center w-[45px] h-[45px]  rounded-lg 
              cursor-pointer ${borederChange[1] ? 'border-2 border-dashed border-gray-600 bg-[#dde4ec]' : 'border-2 border-black bg-white'}
              ${leftActive ? 'animate-redlight' : ''}`}
            onClick={() => itemHandler('||', 1)}>
            ||
          </div>
          <div className={`flex justify-center items-center w-[45px] h-[45px]  rounded-lg 
              cursor-pointer ${borederChange[2] ? 'border-2 border-dashed border-gray-600 bg-[#dde4ec]' : 'border-2 border-black bg-white'}
              ${leftActive ? 'animate-redlight' : ''}`}
            onClick={() => itemHandler('&&', 2)}>
            &&
          </div>

        </div>

        <div className='flex h-[43%] gap-[2px] relative'>
          <div className='flex justify-center items-center w-[40px] h-[40px] lg:w-[45px] lg:h-[45px] rounded-lg bg-white'>
            <p>1</p>
          </div>

          <div
            className={`flex justify-center items-center w-[40px]  lg:w-[45px] border-2 border-black z-10 rounded-lg 
            cursor-pointer ${rightActive ? 'animate-highlight' : ''}`}
            onClick={() => dataHandler(0)}>
            {data[0]}
          </div>

          <div className='flex justify-center items-center w-[40px]  lg:w-[45px] rounded-lg bg-white z-0'>
            <p>9</p>
          </div>

          <div
            className={`flex justify-center items-center w-[40px]  lg:w-[45px] border-2 border-black z-10 rounded-lg 
             cursor-pointer ${rightActive ? 'animate-highlight' : ''}`}
            onClick={() => dataHandler(1)}>
            {data[1]}
          </div>

          <div className='flex justify-center items-center w-[40px]  lg:w-[45px] rounded-lg bg-white'>
            <p>2</p>
          </div>

          <div
            className={`flex justify-center items-center w-[40px]  lg:w-[45px] border-2 border-black z-10 rounded-lg 
            cursor-pointer ${rightActive ? 'animate-highlight' : ''}`}
            onClick={() => dataHandler(2)}>
            {data[2]}
          </div>

          <div className='flex justify-center items-center w-[40px]  lg:w-[45px] rounded-lg bg-white'>
            <p>2</p>
          </div>
        </div>
        {solving && <div className=' p-2'>true!</div>}
      </div>
      <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button>
    </section>



  );
}
