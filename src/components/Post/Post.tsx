import { IPost } from "../../@types";
import { Link } from "react-router";
import "./Post.scss";

interface PostProps {
  post: IPost;
}

// rôle : afficher un article
function Post({ post }: PostProps) {
  return (
    <article className="post">
      <Link to={`/post/${post.title}`} className="post-link">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-category">{post.category}</div>
        <p className="post-excerpt">{post.excerpt}</p>
      </Link>
    </article>
  );
}

export default Post;
