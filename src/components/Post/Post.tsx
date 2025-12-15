import { Link } from "react-router-dom"
import { IPost } from "../../@types"
import { generateSlug } from "../../utils/slug"
import "./Post.scss"

interface PostProps {
  post: IPost
}

// rôle : afficher un article
function Post({ post }: PostProps) {
  return (
    <Link to={`/post/${generateSlug(post.title)}`}>
      <article className="post">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-category">{post.category}</div>
        <p className="post-excerpt">{post.excerpt}</p>
      </article>
    </Link>
  )
}

export default Post
