import { IPost } from "../../@types";
import Post from "../Post/Post";
import { IArticle } from "../../@types";

import "./Posts.scss";

interface PostsProps {
  posts: IPost[];
  // => un tableau d'objets qui correspondent à des articles

  isZenModeEnabled: boolean;
  articles: IArticle[];
  setArticles: (data: IArticle[]) => void;
}

// rôle : afficher tous les articles en déléguant l'affichage d'un article à un autre composant
function Posts({ posts, isZenModeEnabled, articles, setArticles }: PostsProps) {
  // si le mode zen est activé, on ajoute une deuxième classe CSS
  let cssClass = "posts";
  if (isZenModeEnabled) {
    cssClass += " posts--zen";
  }
  // on pourrait utiliser une ternaire :
  // <main className={isZenModeEnabled ? 'posts posts--zen' : 'posts'}>

  return (
    <main className={cssClass}>
      <h1 className="posts-title">Dev Of Thrones</h1>
      <div className="posts-list">
        {posts.map((currentPost) => (
          <Post
            key={currentPost.id}
            post={currentPost}
            articles={articles}
            setArticles={setArticles}
          />
        ))}
      </div>
    </main>
  );
}

export default Posts;
