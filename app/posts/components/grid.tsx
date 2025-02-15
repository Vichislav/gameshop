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
        console.log('toLeft work with' + step)
        const elem = containerRef.current

        if(elem) {
            elem.style.transform = `translateX(${step + 50}px)`;
        }
        setStep((prev) => prev + 50)
        
    }

    const toRight = () => {
        console.log('toRight work with' + step)
        const elem = containerRef.current

        if(elem) {
            elem.style.transform = `translateX(${step-50}px)`;
        }
        setStep((prev) => prev - 50)
    }
        
    return (
        <div className="flex flex-col justify-center items-center">
            {filterPosts? <div className='w-[100%] p-2  flex flex-col  items-center gap-3'>
                {filterPosts.map((item) => (
                    <PostItem newItem={item} key={item.id}/>
                ))}
            </div> : <p>posts not find</p>}
            {botBtn&& 
            <div className='w-[40%]  flex flex-row justify-between p-2 gap-1 '>
                <button className="pl-4" onClick={toLeft}>&#10094;</button>
                <div  ref={wrapRef} className=' relative w-full flex flex-row justify-between overflow-hidden'>

                    <div ref={containerRef} className='relative flex flex-row  p-2 gap-1 transition duration-300 ease-in-out'>
                        {botBtn.map((item) => (
                            <button className='w-[50px]' onClick={()=>paginationHandler(item)} key={`paginationBtn${item}`}>
                                {`${item}`}
                            </button>
                        ))}
                    </div>
                    
                </div>
                <button className="pr-4" onClick={toRight}>&#10095;</button>
            </div>}
        </div>
    )
}
export default GridItem