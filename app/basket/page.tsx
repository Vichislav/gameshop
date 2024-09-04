'use client'
import { useRouter } from "next/navigation";


export default function Basket() {
  const router = useRouter(); 

  const goToHome = () => { 
      router.push('/'); 
  }; 
  return (
    <section className="flex flex-col w-[100%] gap-[20px] mt-[20px] justify-center items-center min-h-screen min-w-[100%] bg-slate-700">
        <h1>
            Привет пес
        </h1>
        <button className='w-[120px] p-[5px] border-2 bg-slate-300' onClick={goToHome}>Back to home</button>
    </section>
  );
}
