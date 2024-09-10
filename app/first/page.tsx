import Grid from "./components";

// Определяем интерфейс для геолокации
interface Geo {
    lat: string;
    lng: string;
  }
  
  // Определяем интерфейс для адреса
  interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  }
  
  // Определяем интерфейс для компании
  interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  
  // Определяем основной интерфейс для пользователя
  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }


const FetchData = async () =>  {
    
const res = await fetch('https://jsonplaceholder.typicode.com/users');
const users = await res.json();

 

  return (
    <div className="flex flex-col items-center p-[5px] w-full">
      <h1 className="text-[50px]">First Gameshop is here</h1>
        <Grid dataProps={users as User[]} />
    </div>
  );
}

export default FetchData
