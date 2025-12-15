import { IPost } from "../../@types"
import { Link } from "react-router"
import "./Post.scss"

interface PostProps {
  post: IPost
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function Post({ post }: PostProps) {
  const slug = slugify(post.title)

  return (
    <article className="post">
      <Link to={`/post/${slug}`}>
        <h2 className="post-title">{post.title}</h2>
      </Link>
      <div className="post-category">{post.category}</div>
      <p className="post-excerpt">{post.excerpt}</p>
    </article>
  )
}

export default Post
