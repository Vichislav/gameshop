'use client'

import Link from 'next/link'
import EnterBtn from '../enterBtn'
import BackButton from '../backBtn'

export default function HeaderComponent() {
  return (
    <>
      <nav className="w-[100%]  md:w-[80%] lg:w-[55%] gap-1 md:g-0 h-[40px] flex justify-center items-start mt-4 flex-wrap">
        <BackButton />
        <Link
          href={'/'}
          className="px-2 smmb:px-4 border-r-2 border-black text-black text-[10px] smmb:text-[12px] md:text-sm hover:text-white  transition-colors"
        >
          Home
        </Link>
        <Link
          href={'/docs'}
          className="px-2 smmb:px-4 border-r-2 border-black text-black text-[10px] smmb:text-[12px] md:text-sm hover:text-white  transition-colors"
        >
          Docs
        </Link>
        <Link
          href={'/tasks'}
          className="px-2 smmb:px-4  border-r-2 border-black text-black text-[10px] smmb:text-[12px] md:text-sm hover:text-white  transition-colors"
        >
          JS tasks
        </Link>
        <Link
          href={'/questions'}
          className="px-2 smmb:px-4 border-r-2 border-black  text-black text-[10px] smmb:text-[12px] md:text-sm hover:text-white  transition-colors"
        >
          Questions
        </Link>
        <EnterBtn />
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
