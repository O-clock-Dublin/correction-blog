import { useParams } from "react-router"
import Post from "../components/Post/Post"
import { IPost } from "../@types"

export default function PostPage({posts} : {posts: IPost[]}) {
  const param = useParams()
  const post = posts.find((post) => post.slug === param.slug)
  return (
    <div>
      <h1>Post detail : {param.slug}</h1>
      <Post post={post} />
    </div>
  )
}
