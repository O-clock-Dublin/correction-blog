import { useEffect } from "react";
import { IPost, IArticle } from "../../@types";
import "./Post.scss";

interface PostProps {
  post: IPost;
  articles: IArticle[];
  setArticles: (data: IArticle[]) => void;
}

// rôle : afficher un article
function Post({ post, articles, setArticles }: PostProps) {
  useEffect(() => {
    const fetchData = async () => {
      const httpRequest = await fetch(
        "https://oclock-api.vercel.app/api/blog/posts"
      );
      const data = await httpRequest.json();
      console.log(data);
      return setArticles(data);
    };
    fetchData();
  }, []);
  return (
    <article className="post">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-category">{post.category}</div>
      <p className="post-excerpt">{post.excerpt}</p>
    </article>
  );
}

export default Post;
