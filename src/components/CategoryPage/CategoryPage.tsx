import { useParams } from "react-router";
import Posts from "../Posts/Posts";
import { IPost } from "../../@types";

interface CategoryPageProps {
  posts: IPost[];
  isZenModeEnabled: boolean;
}

const CategoryPage = ({ posts, isZenModeEnabled }: CategoryPageProps) => {
  const { category } = useParams<{ category: string }>();

  const filteredPosts = posts.filter(
    (post) => post.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="category-page">
      {filteredPosts.length > 0 ? (
        <Posts posts={filteredPosts} isZenModeEnabled={isZenModeEnabled} />
      ) : (
        <p>Aucun article trouvé dans cette catégorie.</p>
      )}
    </div>
  );
};

export default CategoryPage;
