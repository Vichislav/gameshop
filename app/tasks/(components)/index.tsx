'use client'
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

interface TusksTabProps {
    name: string;
}

export default function TusksTab({ name }: TusksTabProps) {

    const [pick, setPick] = useState<boolean>(false)

    const currentUrl = usePathname()
    //#cbd5e1
    useEffect(()=>{
        if(`/${name}`=== currentUrl || `/tasks/${name}`=== currentUrl){
            console.log(`${currentUrl} Eqval!! ${name}`)
            setPick(true)
        }else {
            setPick(false)
        }
    }, [currentUrl])
 
    return (
        <div className="flex justify-center items-center w-full h-[95px] border-2 border-black rounded-lg cursor-pointer"
            style={{ backgroundColor: pick ? '#dde4ec' : 'white',
                     border: pick ? 'none' : '2px solid black',
                     fontSize: pick ? '18px' : '15px' }}>
            {name}
        </div>
    )
}