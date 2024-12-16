import React, { memo } from "react"
import { Post } from "../page"

interface PostProps {
    newItem: Post,
    //delFn: (id: number) => void,
    //renderFn: () => void
}

const PostItem : React.FC<PostProps> = memo( ({newItem})=> {

    console.log('Child render work')
    
    return (
        <div key={newItem.id} className='w-[100%] p-2 rounded-md flex flex-col gap-1 bg-gradient-to-r from-cyan-500 to-blue-500'>
            <h1 className=' text-sm'>{newItem.id}&nbsp;{newItem.title}</h1>
            <p className=' text-xs'>Text: {newItem.body}</p>
            {/* <button className="border-2 w-[50%] " onClick={()=>delFn(newItem.id)}>del</button> */}
            {/* <button className="border-2 w-[50%] " onClick={renderFn}>Log render</button> */}
        </div>
    )
})
export default PostItem