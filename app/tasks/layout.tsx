import Link from "next/link"


export default function TaskLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
            <div className="flex w-full p-2">
                <nav className="flex flex-col gap-2 w-[25%]">
                  <Link href={'/tasks'} className="flex justify-center items-center w-full h-[10%] border-2 border-black rounded-lg cursor-pointer">
                    Start
                  </Link>
                  <Link href={'/tasks/operators'} className="flex justify-center items-center w-full h-[10%] border-2 border-black rounded-lg cursor-pointer">
                    operators
                  </Link>
                  <Link href={'/tasks/eventloop'} className="flex justify-center items-center w-full h-[10%] border-2 border-black rounded-lg cursor-pointer">
                    EventLoop
                  </Link>
                  <Link href={'/tasks'} className="flex justify-center items-center w-full h-[10%] border-2 border-black rounded-lg cursor-pointer">
                    Mock_3
                  </Link>
                </nav>
                <div className="w-[75%]">
                  {children}
                </div>
                
            </div>     
    )
  }
