'use client'
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

interface QuestionsTabProps {
    name: string;
}

export default function QuestionsTab({ name }: QuestionsTabProps) {
    
    const [pick, setPick] = useState<boolean>(false)

    const currentUrl = usePathname()
    //#cbd5e1
    useEffect(()=>{
        if(`/${name}`=== currentUrl || `/questions/${name}`=== currentUrl){
            console.log(`${currentUrl} Eqval!! ${name}`)
            setPick(true)
        }else {
            setPick(false)
        }
    }, [currentUrl, name])
 
    return (
        <div className="flex justify-center items-center w-full h-[95px] border-2 border-black rounded-lg cursor-pointer"
            style={{ backgroundColor: pick ? '#dde4ec' : 'white',
                     border: pick ? '1px dashed grey' : '2px solid black',
                     fontSize: pick ? '15px' : '18px' }}>
            {name}
        </div>
    )
}