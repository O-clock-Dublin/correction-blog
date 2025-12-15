import { IPost } from "../../@types";
import "./Post.scss";
// Import Link
import { Link } from "react-router";

interface PostProps {
  post: IPost;
}

// rôle : afficher un article
function Post({ post }: PostProps) {
  return (
    <Link to={post.route}>
      <article className="post">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-category">{post.category}</div>
        <p className="post-excerpt">{post.excerpt}</p>
      </article>
    </Link>
  );
}

export default Post;
