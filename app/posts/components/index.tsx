import { Post } from "../page"

interface PostProps {
    newItem: Post,
    delFn: (id: number) => void
}

const PostItem : React.FC<PostProps> =({newItem, delFn})=> {

    
    return (
        <div key={newItem.id} className='w-[60%] p-2 border-2 rounded-md'>
            <h1 className='text-lg'>Name: {newItem.title}</h1>
            <p>Text: {newItem.body}</p>
            <button onClick={()=> delFn(newItem.id)}>del</button>
            <br />
        </div>
    )
}
export default PostItem