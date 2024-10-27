'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import React from 'react';
import PostItem from './components';

export interface Post {
    id: number,
    title: string,
    body: string,
    userId: number
}



export default function Posts() {
  const [posts, setPosts] = useState<Post[] | null>(null)

  const router = useRouter(); 

  const goToHome = () => { 
      router.push('/'); 
  }; 

  const DeletePost = (id: number):void => {
    const filterPosts = posts?.filter(item=> item.id != id)
    setPosts(filterPosts as Post[])
  }

  

 
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
      setPosts(json)
    });
  },[])

  return (
    <section className="flex flex-col w-[100%] p-[10px] gap-[20px] mt-[20px] justify-center items-center min-h-screen min-w-[100%] bg-slate-500">
      <h1 className="text-[50px]">Posts Page</h1>
        <div className=' w-[80%] grid grid-cols-1 justify-center justify-items-center gap-2'>
          Amount of posts {posts ? posts.length : 'posts not find'}
           {posts && posts.map((item)=>{
            console.log('PostItem render')
            return(
              <div>
                  <PostItem newItem = {item} delFn={DeletePost}/>
              </div>
              
            )
           })}
        </div>
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button> 
    </section>
  );
}
