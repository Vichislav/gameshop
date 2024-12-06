'use client'
import { useAppSelector } from "@/lib/hooks"
import { useEffect, useState } from "react"

export default function UserLabel () {

    const [userlabel, setUserLebel] = useState<String>('')
    const userData  =  useAppSelector((state)=> state.user)

    useEffect(()=> {
        if(userData.name != ''){
            setUserLebel(userData.name)
            console.log('userData')
            console.log(userData.name)
        }
    }, [userData])

    return (
    <div className="flex justify-center items-center">
        {userData.name != ''?<p className="h-[24px] text-cyan-100">you are logged in as {userData.name}</p> : <div className="h-[24px]"></div>}
    </div>
    )
}