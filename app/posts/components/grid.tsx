'use client'
import React, { memo, useEffect, useRef, useState } from "react"
import { Post } from "../page"
import PostItem from "."

interface GridProps {
    arrPosts: Post [],
    //delFn: (id: number) => void,
    //renderFn: () => void
}

const GridItem : React.FC<GridProps> = ({arrPosts})=> {
    
    const wrapRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [step, setStep] = useState<number>(0)
    const [filterPosts, setFilterPosts] = useState<Post[] | []>([]) 
    const [botBtn, setBotbtn] = useState<number[]>([])
    const [delta, setDelta] = useState<number>(50)
    //const [onerender, setOnerender] = useState<boolean>(false)

    useEffect(() => {
        setFilterPosts(arrPosts.slice(0, 10))
        const result = Math.ceil(arrPosts.length/10)
        const currentSet: { [key: string]: number } = {}
        for (let index = 0; index < result; index++) {
                currentSet[`${index}`] = index
        }
        setBotbtn(Object.values(currentSet)) 
    
    }, [arrPosts])

    const paginationHandler = (num: number) => {
        setFilterPosts(arrPosts.slice(num*10, num*10+10))
    }

    const toLeft = () => {    
        const elem = containerRef.current
        if(elem && step != 0) {
            elem.style.transform = `translateX(${step + delta}px)`;
            setStep((prev) => prev + delta )
            console.log('toLeft work with' + `${step + delta}`)
        }else if (elem){
            shakeLeft(elem, 0)
            console.log('shakeLeft work with')
        }   
    }

    const toRight = () => {
        const elem = containerRef.current

        if(elem && step != -300) {
            elem.style.transform = `translateX(${step-delta}px)`;
            console.log('toRight work with' + `${step - delta}`)
            setStep((prev) => prev - delta )
        }else if (elem){
            shakeRight(elem, -300)
            console.log('shakeRight work with')
        }   
       
    }

    const  shakeLeft = (element: HTMLElement, currentpos: any) => {
        element.style.transform = `translateX(${currentpos+15}px)`;
        setTimeout(() => {
            element.style.transform = `translateX(${currentpos}px)`;
        }, 250); 
      }
      
      const shakeRight = (element: HTMLElement, currentpos: any) => {
           
        element.style.transform = `translateX(${currentpos-15}px)`;
        
        setTimeout(() => {
            element.style.transform = `translateX(${currentpos}px)`;
        }, 250); 
      }
        
    return (
        <div className="flex flex-col justify-center items-center">
            {filterPosts? <div className='w-[100%] p-2  flex flex-col  items-center gap-3'>
                {filterPosts.map((item) => (
                    <PostItem newItem={item} key={item.id}/>
                ))}
            </div> : <p>posts not find</p>}
            {botBtn&& 
            <div className='w-[50%] flex flex-row items-center justify-center p-2 gap-1 '>

                <button className="w-[50px] h-[32px] p-1 rounded-xl flex items-center justify-center  hover:bg-zinc-50" onClick={toLeft}>&#10094;</button>

                <div  ref={wrapRef} className=' relative w-[200px] flex flex-row justify-between overflow-hidden'>

                    <div ref={containerRef} className='relative flex flex-row  transition duration-300 ease-in-out'>
                        {botBtn.map((item) => (
                            <button className='w-[50px] hover:bg-zinc-50 rounded-md p-1' onClick={()=>paginationHandler(item)} key={`paginationBtn${item}`}>
                                {`${item}`}
                            </button>
                        ))}
                    </div>
                    
                </div>

                <button className="w-[50px] h-[32px] p-1 rounded-xl flex items-center justify-center  hover:bg-zinc-50" onClick={toRight}>&#10095;</button>

            </div>}
        </div>
    )
}
export default GridItem