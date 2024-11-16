type AuthorProps = {
    params: {
        id: string
    }
}

export default function AuthorPage({params: {id}}:AuthorProps) {

    
    console.log(id)
    console.log('AuthorPage correct')
    
    return (
        <div className="flex p-5 justify-center items-center">
            <p>AuthorPage with id {id}</p>
        </div>
    )
}