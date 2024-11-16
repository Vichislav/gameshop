'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  const [count, setCount] = useState<number>(0)
  const refCount = useRef<number>(0)
  const router = useRouter(); 

  const goToHome = () => { 
      router.push('/'); 
  }; 

  const DeletePost = (id: number): void => {
    const filterPosts = posts?.filter(item=> item.id != id)
    setPosts(filterPosts || [])
  }


  console.log('Parent render work')

  const LogRender =  useCallback(() => {
    setCount(prev => prev + 1)
    //refCount.current + 1
    console.log('render work' + refCount.current)
  }, [])

  

 
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
            if(item.id < 5){
              return(
                <div className='flex justify-center w-[100%]' key={item.id}>
                    <PostItem newItem = {item}  renderFn={LogRender}/>
                </div>)
            }
           })}
        </div>
        <button className=' fixed top-[90%] left-[80%] w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button> 
    </section>
  );
}
