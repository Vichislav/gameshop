import Grid from "./components";

// Определяем интерфейс для геолокации
export interface Geo {
  lat: string;
  lng: string;
}

// Определяем интерфейс для адреса
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

// Определяем интерфейс для компании
export interface Company {
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


const getUsers = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    return users
  } catch (error) {
    console.error(error)
  }
}


const FetchData = async () => {


  const users = await getUsers();


  return (
    <div className="flex flex-col items-center p-[5px] w-full min-h-[95vh]">
      <Grid dataProps={users as User[]} />
    </div>
  );
}

export default FetchData
