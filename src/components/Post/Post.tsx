import { IArticle } from "../../@types";
import "./Post.scss";

interface PostProps {
  article: IArticle;
}

// rôle : afficher un article
function Post({ article }: PostProps) {
  return (
    <article className="post">
      <h2 className="post-title">{article.title}</h2>
      <div className="post-category">{article.category}</div>
      <p className="post-excerpt">{article.excerpt}</p>
    </article>
  );
}

export default Post;
