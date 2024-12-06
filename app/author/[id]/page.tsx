import { User } from "@/app/first/page";
type AuthorProps = {
    params: {
        id: string
    }
}

const getUser = async (id:string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await res.json();
    return user
}

export default async function AuthorPage({params: {id}}:AuthorProps) {

    const data = await getUser(id)
    console.log(id)
    console.log('AuthorPage correct')
    
    return (
        <div className="flex flex-col p-5 justify-center items-center ">
            <p>AuthorPage with id {id}</p>
            <p>{data.name}</p>
            <p>AuthorPage with id {id}</p>
        </div>
    )
}