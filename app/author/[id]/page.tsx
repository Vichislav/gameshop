import { User } from "@/app/first/page";
type AuthorProps = {
    params: {
        id: string
    }
}

export interface IPost {
    id: number,
    title: string,
    body: string,
    userId: number
}

const getUser = async (id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await res.json();
    return user
}

const getUsersPosts = async (id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    const posts = await res.json();
    return posts
}

export default async function AuthorPage({ params: { id } }: AuthorProps) {

    const data = await getUser(id)
    const posts = await getUsersPosts(id)
    console.log(id)
    console.log('AuthorPage correct')

    return (
        <div className="flex flex-col p-5 justify-center items-center ">
            <h1>AuthorPage for <b>{data.name}</b></h1>
            {posts ? <ul className="w-[60%] flex flex-col gap-2">
                {posts.map((post: IPost) => {
                    return (
                        <li key={post.id} className="flex flex-col gap-1 odd:bg-slate-400 even:bg-neutral-400 p-3 rounded-md">
                            <h1><b>{post.id} {post.title}</b></h1>
                            <p>{post.body}</p>
                            <hr></hr>
                        </li>
                    )
                })}
            </ul> : <p>posts not founded</p>}

        </div>
    )
}