import { IPost } from "../../@types"
import "./Post.scss"
import { Link } from "react-router"

interface PostProps {
  post: IPost
}

// rôle : afficher un article
function Post({ post }: PostProps) {
  return (
    <Link to={`/post/${post.title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`}>
      <article className="post">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-category">{post.category}</div>
        <p className="post-excerpt">{post.excerpt}</p>
      </article>
    </Link>

  )
}

export default Post
