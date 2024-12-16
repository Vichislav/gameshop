'use client'
import React, { memo, useEffect, useState } from "react"
import { Post } from "../page"
import PostItem from "."

interface GridProps {
    arrPosts: Post [],
    //delFn: (id: number) => void,
    //renderFn: () => void
}

const GridItem : React.FC<GridProps> = ({arrPosts})=> {

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
        
    return (
        <div>
            {filterPosts? <div className='w-[100%] p-2  flex flex-col  items-center gap-3'>
                {filterPosts.map((item) => (
                    <PostItem newItem={item} key={item.id}/>
                ))}
            </div> : <p>posts not find</p>}
            {botBtn&& 
            <div className='w-[100%]  flex flex-row justify-between p-2 gap-1'>
                <button className="pl-4">&#10094;</button>
                {botBtn.map((item) => (
                    <button onClick={()=>paginationHandler(item)} key={`paginationBtn${item}`}>
                        {`${item}`}
                    </button>
                ))}
                <button className="pr-4">&#10095;</button>
            </div>}
        </div>
    )
}
export default GridItem