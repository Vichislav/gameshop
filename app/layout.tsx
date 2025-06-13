import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./reset.css";
import StoreProvider from './StoreProvider';
import Link from "next/link";
import EnterBtn from "./component/enterBtn";
import UserLabel from "./component/userLabel";
import Image from "next/image";
import backGround from '../app/img/line.jpg'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JS study",
  description: "Site for learn, site for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>
          <div className="relative w-full flex justify-center">

            <div className=" hidden md:block absolute inset-0 z-0">
              <Image
                className='object-cover' // чтобы изображение сохраняло свои пропорции и заполнило контейнер
                src={backGround}
                layout='fill' // подгоняет изображение под размер контейнера 
                alt="Picture of the background"  
              />
            </div>
             
            <div className="w-full md:w-[80%] relative z-10"> 
              <header className="w-full h-[100px]  flex flex-col justify-end items-center bg-gradient-radial from-slate-500 to-slate-300">
                <nav className="w-[100%] md:w-[80%] lg:w-[50%] gap-1 md:g-0 h-[40px] flex justify-center items-start mt-4 flex-wrap">
                  <Link href={'/about'} className="pl-4 pr-4 border-l-2 border-r-2 text-cyan-100 text-sm lg:text-md">About</Link>
                  <Link href={'/tasks'} className="pl-4 pr-4  border-r-2 text-cyan-100 text-sm lg:text-md">JS tasks</Link>
                  <div className="flex flex-col items-center justify-start">
                    <div className="flex h-[20px]">
                      <Link href={'/'} className="pl-4 pr-4  border-r-2 text-cyan-100 text-sm lg:text-md">Authors</Link>
                      <Link href={'/posts'} className="pl-4 pr-4 border-r-2  text-cyan-100 text-sm lg:text-md">Posts</Link>
                    </div>
                    <p className="pt-1 text-[7px] lg:text-[10px] ">↑ Work with API ↑</p>
                  </div>

                  <EnterBtn />
                </nav>
                <div className="w-[60%] flex justify-end mb-1">
                  <UserLabel />
                </div>
              </header>
              <main className="bg-gradient-to-tr from-slate-300 to-slate-100">
                {children}
              </main>
              <div id="modal-root"></div>

              <footer>

              </footer>
            </div>
          </div>
        </body>
      </StoreProvider>
    </html>

  );
}
