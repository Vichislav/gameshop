type postProps = {
    params: {
        slag: string
    }
}

export interface IComment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
}

const getComments = async (id: string) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const posts = await res.json();
        return posts
    } catch (error) {
        console.error(error)
    }  
}

export default async function PostPage({params: {slag}}: postProps) {

    const comments =  await getComments(slag)
    
    return (
        <div className="flex flex-col items-center w-full pt-5 min-h-[calc(100vh-116px)]">
            <div className="flex flex-col justify-center w-[70%] ">
                <h1>Hi this is comments of post with id:{slag}</h1>
                {comments? 
                <ul>
                    {comments.map((item: IComment) => {
                        return (
                            <div key={item.id} className="p-2">
                                <h2>{item.name}</h2>
                                <p>{item.body}</p>
                                <hr></hr>
                            </div>
                        )
                    })}
                </ul> :  <p>comments not founded</p>}
            </div>
        </div>
    )
}