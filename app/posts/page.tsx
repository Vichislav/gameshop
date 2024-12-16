import React from 'react';
import PostItem from './components';
import GridItem from './components/grid';


export interface Post {
    id: number,
    title: string,
    body: string,
    userId: number
}

const getAllPosts = async () => {
  try {
    const response =  await fetch('https://jsonplaceholder.typicode.com/posts')
    if(!response.ok){
      throw new Error (`response status ${response.status}`)
    }
    const posts = await response.json()
    return posts
  } catch (error) {
    console.error(error)
  }
}


export default async function Posts() {

  const data = await getAllPosts()

  



  return (
    <section className="flex flex-col w-[100%] p-[10px] gap-[20px] items-center min-h-screen min-w-[100%] bg-slate-400">
      <h1 className="text-[30px]">All posts here</h1>
        <div className=' w-[80%] flex flex-col items-center'>
        {data? 
        <div className=' w-[80%] flex flex-col'>
          <GridItem arrPosts={data}/>
        </div> 
        : 
        <p>Posts not find</p>}
        
        </div>
       
    </section>
  );
}
