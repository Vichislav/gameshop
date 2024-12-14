import PostView from "../(component)"

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
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const user = await res.json();
        return user
    }catch (error) {
        console.error(error)
    }
}

const getUsersPosts = async (id: string) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        const posts = await res.json();
        return posts
    } catch (error) {
        console.error(error)
    }  
}

export default async function AuthorPage({ params: { id } }: AuthorProps) {

    
    const data = await getUser(id)
    const posts = await getUsersPosts(id)

   

    return (
        <div className="flex flex-col p-5 justify-center items-center ">
            <h1>AuthorPage for <b>{data.name}</b></h1>
            {posts ? <ul className="w-[60%] flex flex-col gap-2">
                {posts.map((post: IPost) => {
                    return (
                       <PostView authorId={id} post={post} key={post.id}/>
                    )
                })}
            </ul> : <p>posts not founded</p>}

        </div>
    )
}