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
        <div>
            <h1>Hi this is comments of post with id:{slag}</h1>
            {comments? 
            <ul>
                {comments.map((item: IComment) => {
                    return (
                        <div>
                            <h2>{item.name}</h2>
                            <p>{item.body}</p>
                        </div>
                    )
                })}
            </ul> :  <p>comments not founded</p>}
        </div>
    )
}