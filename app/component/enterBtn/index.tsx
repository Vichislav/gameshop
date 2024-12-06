'use client'
import Modal from "../Modal";
import { ChangeEvent, useState } from "react";
import { createUserData } from "@/lib/features/user/user.slice";
import { useAppStore, useAppDispatch } from "@/lib/hooks";

export interface IUser {
    name: string,
    password: string
}

export default function EnterBtn() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<IUser>({name: '', password: ''})
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const store = useAppStore()
    const dispatch = useAppDispatch()
    


    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(`formData`)
        console.log(formData)
        window.localStorage.setItem(formData.name, formData.password) //закинул в localStorage
        store.dispatch(createUserData({name: formData.name, password: formData.password})) // закинул в Store
        setFormData({name: '', password: ''}) //почистил стейт
        closeModal()
    }

    const commonOnChange =(inputName: keyof IUser)=> {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => {
                return {...prev, [inputName]: e.target.value }
            })
        }
    }


    return (
        <>
            <button className="pl-4 pr-4  border-r-2 text-cyan-100" onClick={openModal}>&#9776;</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} big={false}>
                <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-8">
                    <h1>Registration form</h1>
                    <label className="w-[80%] flex flex-col gap-1 items-centr justify-start">
                        <h2 className="text-[18px]">name</h2>
                        <input type="text" className="w-[100%] border-2 h-8 p-2 rounded-md" placeholder="enter a name"
                        value={formData.name} onChange={commonOnChange('name')} />
                        <p className="text-[12px]">the name must not contain non-printable characters</p>
                    </label>
                    <label className="w-[80%] flex flex-col gap-1 items-centr justify-start">
                        <h2 className="text-[18px]">password</h2>
                        <input type="text" className="w-[100%] border-2 h-8 p-2 rounded-md" placeholder="enter the password"
                         value={formData.password} onChange={commonOnChange('password')} />
                        <p className="text-[12px]">the password must not contain unprintable characters</p>
                    </label>
                    
                    <button type="submit" className="w-[60%] h-[30px] border-2 border-blue-500 m-2 flex justify-center items-center 
                        rounded no-parent-hover active:border-4">Registration
                    </button>
                </form>

            </Modal>
        </>
    )
}