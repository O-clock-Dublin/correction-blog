import { useParams } from "react-router"
import Post from "../Post/Post"
import { IPost } from "../../@types"

export default function PostPage({ posts }: { posts: IPost[] }) {
    console.log(posts)
    const param = useParams()
    const post = posts.find((post) => post.slug === param.slug)
    console.log(post)
    return (
        <div>
            <h1>Post detail : {param.slug}</h1>
            {!post ? (
                <p>Article non trouvé. Vérifiez l'URL et réessayez.</p>
            ) : (
                <Post post={post} />
            )}
        </div>
    )
}