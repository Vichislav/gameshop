'use client'


import Link from "next/link";
import EnterBtn from "../enterBtn";
import { useState } from "react";



export default function HeaderComponent() {

    const [isOpen, setOpen] = useState(false);

    const OpentHandler = () => {
        setOpen(prev => !prev)
    }





    return (
        <>
            <nav className="w-[100%]  md:w-[80%] lg:w-[50%] gap-1 md:g-0 h-[40px] flex justify-center items-start mt-4 flex-wrap">
                <Link href={'/'} className="pl-4 pr-4  border-r-2 text-cyan-100 text-sm lg:text-md">Home</Link>
                <Link href={'/about'} className="pl-4 pr-4  border-r-2 text-cyan-100 text-sm lg:text-md">About</Link>
                <Link href={'/tasks'} className="pl-4 pr-4  border-r-2 text-cyan-100 text-sm lg:text-md">JS tasks</Link>
                <Link href={'/questions'} className="pl-4 pr-4   text-cyan-100 text-sm lg:text-md">Questions</Link>
                {/* <div className="flex flex-col items-center justify-start">
                    <div className="flex h-[20px]">
                        <Link href={'/first'} className="pl-4 pr-4  border-r-2 text-cyan-100 text-sm lg:text-md">Authors</Link>
                        <Link href={'/posts'} className="pl-4 pr-4 border-r-2  text-cyan-100 text-sm lg:text-md">Posts</Link>
                    </div>
                    <p className="pt-1 text-[7px] lg:text-[10px] ">↑ Work with API ↑</p>
                </div> */}

                {/* <EnterBtn /> */}
            </nav>

        {/*     <div className="w-[100%] md:w-[80%] lg:w-[50%] gap-1 md:g-0 h-fit flex md:hidden lg:hidden justify-center items-start flex-wrap">


                {isOpen ?
                    <nav className="w-[100%]  md:w-[80%] lg:w-[50%] gap-1 md:g-0 h-[40px] flex justify-center items-start mt-4 flex-wrap">
                        <Link href={'/about'} className="pl-4 pr-4 border-l-2 border-r-2 text-cyan-100 text-sm lg:text-md">About</Link>
                        <Link href={'/tasks'} className="pl-4 pr-4  border-r-2 text-cyan-100 text-sm lg:text-md">JS tasks</Link>
                        <div className="flex flex-col items-center justify-start">
                            <div className="flex h-[20px]">
                                <Link href={'/first'} className="pl-4 pr-4  border-r-2 text-cyan-100 text-sm lg:text-md">Authors</Link>
                                <Link href={'/posts'} className="pl-4 pr-4 border-r-2  text-cyan-100 text-sm lg:text-md">Posts</Link>
                            </div>
                            <p className="pt-1 text-[7px] lg:text-[10px] ">↑ Work with API ↑</p>
                        </div>

                        <EnterBtn />
                        <div className="w-full h-[20px] flex p-1 justify-center  bg-slate-500 items-center hover:border-2 hover:border-black" onClick={OpentHandler}>&#9650;</div>
                    </nav> 
                    :
                    <div className="w-full h-[20px] flex p-1 justify-center bg-slate-500 items-center hover:border-2 hover:border-black" onClick={OpentHandler}>&#9660;</div>}

            </div> */}

        </>
    )
}