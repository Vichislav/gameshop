import Link from "next/link"
import QuestionsTab from "./(components)"



export default function QuestionsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
            <div className="flex flex-col lg:flex-row w-full p-2">
                <nav className="flex flex-row lg:flex-col gap-2 w-[100%] lg:w-[25%] justify-center lg:justify-start">
                  <Link href={'/questions'} className="w-[30%] lg:w-auto">
                    <QuestionsTab name={'questions'}></QuestionsTab>
                  </Link>
                  <Link href={'/questions/hr'} className="w-[30%] lg:w-auto">
                    <QuestionsTab name={'hr'}></QuestionsTab>
                  </Link>
                  <Link href={'/questions/technical'} className="w-[30%] lg:w-auto">
                    <QuestionsTab name={'technical'}></QuestionsTab>
                  </Link>
                </nav>
                <div className="w-[100%] lg:w-[75%]">
                  {children}
                </div>
                
            </div>     
    )
  }
