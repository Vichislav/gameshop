import { User } from "../page";
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks'
import { addUserToGroup } from '@/lib/features/group/group.slice';
import { amountProps, createAmountData } from '@/lib/features/amount/amount.slice';
import Modal from "@/app/component/Modal";
import { useState } from "react";

interface MyProps {
    item: User
}


const ItemComponent: React.FC<MyProps> = ({item}) => {

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const store = useAppStore()
    const dispatch = useAppDispatch()

    const addUser = (item: User) => {
      store.dispatch(addUserToGroup(item))
      console.log('dispatch work with ' + item.name)

      const currentAmount: amountProps = {
        key: `${item.id}`,
        value: 1
      }
      store.dispatch(createAmountData(currentAmount))
    }

    return(
        <div className='card p-[10px] m-[10px] w-[80%] border-2 border-black rounded-lg hover:bg-white' key={item.id}>
            <p>{item.name}</p>
            <button onClick={openModal}>Open Modal</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>This is a Modal! for {item.name}</h2>
                <p>You can add any content here.</p>
            </Modal>
            <button onClick={() => {addUser(item)}} 
            className='btn w-[40px] h-[20px] border-2 border-blue-500 m-2 flex justify-center items-center 
            rounded no-parent-hover active:border-4'>
                +
            </button> 
        </div>
        ) 
}

export default ItemComponent