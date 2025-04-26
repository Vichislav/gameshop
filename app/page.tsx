import Image from "next/image";
import FetchData from "./first/page";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-[25px] pt-4">Welcome to JS Study!</h1>
      <FetchData/>
    </main>
  );
}
