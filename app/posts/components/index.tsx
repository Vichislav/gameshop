import React, { memo } from "react"
import { Post } from "../page"

interface PostProps {
    newItem: Post,
    //delFn: (id: number) => void,
    renderFn: () => void
}

const PostItem : React.FC<PostProps> = memo( ({newItem, renderFn})=> {

    console.log('Child render work')
    
    return (
        <div key={newItem.id} className='w-[60%] p-2 border-2 rounded-md flex flex-col gap-1'>
            <h1 className='text-lg'>Name: {newItem.title}</h1>
            <p>Text: {newItem.body}</p>
            {/* <button className="border-2 w-[50%] " onClick={()=>delFn(newItem.id)}>del</button> */}
            <button className="border-2 w-[50%] " onClick={renderFn}>Log render</button>
            <br />
        </div>
    )
})
export default PostItem