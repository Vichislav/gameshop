import Image from "next/image";
import FetchData from "./first/page";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-[50px]">Gameshop</h1>
      <FetchData/>
    </main>
  );
}
