'use client'
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";



export default function EventTask1() {

    const [solving, setSolving] = useState<boolean>(false)// верно ли решено задание
    const [data, setData] = useState<string[]>(['...', '...', '...', '...', '...']);
    const [activ, setActiv] = useState<boolean[]>([true, true, true, true, true])
    const [count, setCount] = useState<number>(0)
    
    const dataHandler = (ind: number) => {
        setData(data => {
            const newData = [...data]
            newData[count] = `${ind+1}`
            return newData
        })
        setCount(prev => prev + 1)
        activHandler(ind)
    }

    const activHandler = (ind: number) => {
        setActiv(activ => {
            const newArr = [...activ]
            newArr[ind] = false
            return newArr
        })
    }

    const onStart = () => {
        setData(()=> {
            const newArr = ['...', '...', '...', '...', '...']
            return newArr
        })
        setActiv(activ => {
            const newArr = [true, true, true, true, true]
            return newArr
        })
        setCount(0)
    }



    useEffect(() => {
        //
        const expression = `13542`;
        const currentSolving = `${data[0]}${data[1]}${data[2]}${data[3]}${data[4]}`
        
        if (currentSolving === expression) {
            setSolving(true);

        } else {
            setSolving(false);
        }
    }, [data])
//bg-[#c0bfbf]
    return (
        <div className='w-[100%] lg:w-[80%] flex flex-col items-center gap-[10px] border-2  border-black rounded-[8px] '
            style={{ backgroundColor: solving ? '#7efca0' : 'white' }}>

            <div className=' w-full text-center bg-[#dde4ec] rounded-t-[5px]'>
                <p className='text-sm px-2 py-1'>Определите последовательность выполнения кода, нажатием на соответсвующую строку</p>
            </div>

            <div className="flex w-full justify-around">
                <div className="flex flex-col text-[10px] leading-8 md:text-sm lg:text-base">

                    <div className=" cursor-pointer "
                      style={{ backgroundColor: activ[0] ? 'white' : '#c0bfbf' }}
                      onClick={()=>dataHandler(0)}>
                        <p className=' px-2 '>
                            <span className='text-blue-500'>console</span>.
                            <span className='text-yellow-500'>log</span>
                            <span className='text-purple-700'>&#40;</span>
                            &nbsp;1&nbsp;
                            <span className='text-purple-700'>&#41;</span>
                        </p>
                    </div>

                    <div className=" cursor-pointer "
                      style={{ backgroundColor: activ[1] ? 'white' : '#c0bfbf' }}
                      onClick={()=>dataHandler(1)}>
                        <p className=' px-2 '>
                            <span className='text-yellow-500'>setTimeout</span>
                            <span className='text-yellow-400'>&#40;</span>
                            <span className='text-purple-700'>&#40;</span>
                            <span className='text-purple-700'>&#41;</span>
                            <span>&nbsp;=&gt;&nbsp;</span>
                            <span className='text-blue-500'>console</span>
                            .
                            <span className='text-yellow-500'>log</span>
                            <span className='text-purple-700'>&#40;</span>
                            <span>&nbsp;2&nbsp;</span>
                            <span className='text-purple-700'>&#41;</span>
                            <span>&sbquo;&nbsp;1000</span>
                            <span className='text-yellow-400'>&#41;</span>
                        </p>
                    </div>

                    <div className=" cursor-pointer "
                      style={{ backgroundColor: activ[2] ? 'white' : '#c0bfbf' }}
                      onClick={()=>dataHandler(2)}>
                        <p className=' px-2 '>
                            <span className='text-blue-500'>console</span>.
                            <span className='text-yellow-500'>log</span>
                            <span className='text-purple-700'>&#40;</span>
                            &nbsp;3&nbsp;
                            <span className='text-purple-700'>&#41;</span>
                        </p>
                    </div>

                    <div className=" cursor-pointer "
                      style={{ backgroundColor: activ[3] ? 'white' : '#c0bfbf' }}
                      onClick={()=>dataHandler(3)}>
                        <p className=' px-2 '>
                            <span className='text-yellow-500'>setTimeout</span>
                            <span className='text-yellow-400'>&#40;</span>
                            <span className='text-purple-700'>&#40;</span>
                            <span className='text-purple-700'>&#41;</span>
                            <span>&nbsp;=&gt;&nbsp;</span>
                            <span className='text-blue-500'>console</span>
                            .
                            <span className='text-yellow-500'>log</span>
                            <span className='text-purple-700'>&#40;</span>
                            <span>&nbsp;4&nbsp;</span>
                            <span className='text-purple-700'>&#41;</span>
                            <span className='text-yellow-400'>&#41;</span>
                        </p>
                    </div>

                    <div className=" cursor-pointer  "
                      style={{ backgroundColor: activ[4] ? 'white' : '#c0bfbf' }}
                      onClick={()=>dataHandler(4)}>
                        <p className='px-2 '>
                            <span className='text-blue-500'>console</span>.
                            <span className='text-yellow-500'>log</span>
                            <span className='text-purple-700'>&#40;</span>
                            &nbsp;5&nbsp;
                            <span className='text-purple-700'>&#41;</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col w-[20px] justify-center items-center pb-2">
                    <div>{data[0]}</div>
                    <div>{data[1]}</div>
                    <div>{data[2]}</div>
                    <div>{data[3]}</div>
                    <div>{data[4]}</div>
                    <div className="cursor-pointer" onClick={()=>onStart()} >&#10060;</div>
                </div>
                
            </div>

            {solving && <div className=' p-2'>true!</div>}
        </div>
    )
}