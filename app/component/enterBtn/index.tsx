'use client'
import Modal from "../Modal";
import { ChangeEvent, useState } from "react";
import { createUserData } from "@/lib/features/user/user.slice";
import { useAppStore, useAppDispatch } from "@/lib/hooks";

export interface AuthUser {
    login: string,
    email: string
}

export default function EnterBtn() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<AuthUser>({login: '', email: ''})
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const store = useAppStore()
    const dispatch = useAppDispatch()

    /************************************************************/
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState<'email' | 'code'>('email');
  
    const sendCode = async () => {
        try {
          const res = await fetch('/api/auth/send-code', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
          });
          if (res.ok) {
            setStep('code');
          } else {
            const errorText = await res.text();
            console.error('Send code failed:', errorText);
            alert('Ошибка отправки кода. Попробуйте позже.');
          }
        } catch (err) {
          console.error('Network error:', err);
          alert('Сетевая ошибка');
        }
      };
  
    const verifyCode = async () => {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (res.ok) {
        // Сохраняем токен (например, в localStorage или куки)
        localStorage.setItem('token', data.token);
        // Перенаправляем пользователя на страницу его профиля
        const userId = data.user?.id;
        if (userId) {
          window.location.href = `/profile/${userId}`;
        } else {
          // fallback, если по какой‑то причине id нет
          window.location.href = '/';
        }
        closeModal() //закрывваем модальное окно
      } else {
        alert('Неверный код');
      }
    };
    


   /*  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        window.localStorage.setItem(formData.name, formData.password) //закинул в localStorage
        store.dispatch(createUserData({name: formData.name, password: formData.password})) // закинул в Store
        setFormData({name: '', password: ''}) //почистил стейт
        closeModal()
    } */
    //const onSubmit = 

    const commonOnChange =(inputName: keyof AuthUser)=> {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => {
                return {...prev, [inputName]: e.target.value }
            })
        }
    }



    return (
        <>
            <button className="px-2 smmb:px-4 text-cyan-100 text-[10px] smmb:text-[12px] md:text-sm" onClick={openModal}>&#9745;</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form  className="flex flex-col justify-center items-center gap-8">
                {step === 'email' ? (<>
                    <h1>Registration form</h1>
                    <label className="w-[80%] flex flex-col gap-1 items-centr justify-start">
                        <h2 className="text-[14px] smmb:text-[18px]">login</h2>
                        <input type="text" className="w-[100%] border-2 h-8 p-2 rounded-md" placeholder="enter a Login"
                        value={formData.login} onChange={commonOnChange('login')} />
                        <p className="text-[10px] smmb:text-[12px]">the name must not contain non-printable characters</p>
                    </label>
                    <label className="w-[80%] flex flex-col gap-1 items-centr justify-start">
                        <h2 className="text-[14px] smmb:text-[18px]">email</h2>
                        <input type="text" className="w-[100%] border-2 h-8 p-2 rounded-md" placeholder="enter the email"
                         value={email} onChange={e => setEmail(e.target.value)} />
                        <p className="text-[10px] smmb:text-[12px]">the email must not contain unprintable characters</p>
                    </label>
                    
                    <button type="button" onClick={sendCode} className="w-[60%] h-[30px] border-2 border-blue-500 m-2 flex justify-center items-center 
                        rounded no-parent-hover active:border-4">Registration
                    </button>
                    </>):(
                        <div>
                        <input value={code} onChange={e => setCode(e.target.value)} placeholder="email code" />
                        <button type="button" onClick={verifyCode}>Enter</button>
                        </div>
                    )} 
                </form>
            </Modal>
        </>
    )
}