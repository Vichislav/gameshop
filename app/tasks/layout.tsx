import Link from "next/link"
import TusksTab from "./(components)"


export default function TaskLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
            <div className="flex w-full p-2">
                <nav className="flex flex-col gap-2 w-[25%]">
                  <Link href={'/tasks'} >
                    <TusksTab name={'tasks'}></TusksTab>
                  </Link>
                  <Link href={'/tasks/operators'}>
                    <TusksTab name={'operators'}></TusksTab>
                  </Link>
                  <Link href={'/tasks/eventloop'} >
                    <TusksTab name={'eventloop'}></TusksTab>
                  </Link>
                </nav>
                <div className="w-[75%]">
                  {children}
                </div>
                
            </div>     
    )
  }
