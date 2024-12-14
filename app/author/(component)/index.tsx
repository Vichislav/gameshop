'use client'

import { useRouter } from "next/navigation";
import { IPost } from "../[id]/page"

type PostViewProps = {
    post: IPost,
    authorId: string
}

export default function PostView({post, authorId}: PostViewProps) {

    const router = useRouter(); 

    const goToPostWithComments = (aId: string, pId: string) => { 
        router.push(`/author/${aId}/post/${pId}`); 
    }; 

    return(
        <li key={post.id} onClick={()=>goToPostWithComments(`${authorId}`,`${post.id}`)} className="flex flex-col gap-1
         odd:bg-slate-400 even:bg-neutral-400 p-3 rounded-md cursor-pointer hover:opacity-80">
            <h1><b>{post.id} {post.title}</b></h1>
            <p>{post.body}</p>
            <hr></hr>
        </li>
    )
}