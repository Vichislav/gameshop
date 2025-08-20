import { User } from "../page";
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks'
import { addUserToGroup } from '@/lib/features/group/group.slice';
import { amountProps, createAmountData } from '@/lib/features/amount/amount.slice';
import Modal from "@/app/component/Modal";
import { useState } from "react";
import Image from "next/image";
import akkPhoto from '../../img/akkPhoto.png'
import { useRouter } from "next/navigation";
interface MyProps {
    item: User
}


const ItemComponent: React.FC<MyProps> = ({ item }) => {

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const store = useAppStore()
    const dispatch = useAppDispatch()
    const router = useRouter(); 

    const goToAothor = (id: string) => { 
        router.push(`/author/${id}`); 
    }; 

    /*  const addUser = (item: User) => {
       store.dispatch(addUserToGroup(item))
       console.log('dispatch work with ' + item.name)
 
       const currentAmount: amountProps = {
         key: `${item.id}`,
         value: 1
       }
       store.dispatch(createAmountData(currentAmount))
     } */

    return (
        <div className='card p-[10px] m-[10px] w-[80%] border-2 border-black rounded-lg hover:bg-white' key={item.id}>
            <p className="text-gray-600 text-[18px]">{item.name}</p>
            <p>from {item.address.city}</p>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-col h-full p-5 justify-between">
                    <div className="flex flex-row gap-3 max-w-[125px] lg:max-w-[250px] h-[125px] lg:h-[220px]">
                        <Image
                            src={akkPhoto}
                            width={250}
                            height={250}
                            alt="Picture of the author"
                        />
                        <div className=" p-3 flex flex-col gap-2 text-base lg:text-lg">
                            <p > <b>name:</b> {item.name}</p>
                            <p > <b>email:</b> {item.email}</p>
                            <p> <b>website:</b> {item.website}</p>
                        </div>
                    </div>
                    <div className="flex p-5 justify-end items-end">
                        <button className="border-black border-2 rounded-md p-1 hover:bg-slate-400" onClick={()=>goToAothor(`${item.id}`)}>
                            See more
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="flex justify-end">
                <button onClick={openModal}
                    className='btn w-[40px] h-[20px] border-2 border-blue-500 m-2 flex justify-center items-center 
                rounded no-parent-hover active:border-4'>
                    +
                </button>
            </div>

        </div>
    )
}

export default ItemComponent