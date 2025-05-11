import Link from "next/link"
import TusksTab from "./(components)"


export default function TaskLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
            <div className="flex flex-col lg:flex-row w-full p-2">
                <nav className="flex flex-row lg:flex-col gap-2 w-[100%] lg:w-[25%]">
                  <Link href={'/tasks'} className="w-[25%] lg:w-auto">
                    <TusksTab name={'tasks'}></TusksTab>
                  </Link>
                  <Link href={'/tasks/operators'} className="w-[25%] lg:w-auto">
                    <TusksTab name={'operators'}></TusksTab>
                  </Link>
                  <Link href={'/tasks/eventloop'} className="w-[25%] lg:w-auto">
                    <TusksTab name={'eventloop'}></TusksTab>
                  </Link>
                </nav>
                <div className="w-[100%] lg:w-[75%]">
                  {children}
                </div>
                
            </div>     
    )
  }
