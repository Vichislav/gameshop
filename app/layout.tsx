import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from './StoreProvider';
import Link from "next/link";
import EnterBtn from "./component/enterBtn";
import UserLabel from "./component/userLabel";

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
              <header className="w-full h-[100px] bg-slate-500 flex flex-col justify-end items-center">
                <nav className="w-[500px] h-[40px] flex justify-center items-center">
                  <Link href={'/about'} className="pl-4 pr-4 border-l-2 border-r-2 text-cyan-100">About</Link>
                  <Link href={'/posts'} className="pl-4 pr-4  border-r-2 text-cyan-100">Posts</Link>
                  <Link href={'/basket'} className="pl-4 pr-4  border-r-2 text-cyan-100">Basket</Link>
                  <Link href={'/'} className="pl-4 pr-4  border-r-2 text-cyan-100">Home</Link>
                  <EnterBtn/>
                </nav>
                <div className="w-[60%] flex justify-end mb-1">
                  <UserLabel/>
                </div>
              </header>
              {children}
              <footer>

              </footer>
            </body>
        </StoreProvider>  
      </html>
    
  );  
}
