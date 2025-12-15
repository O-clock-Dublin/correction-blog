import { useParams } from "react-router";
import { IPost } from "../../@types";
import Post from "../Post/Post";

interface PostPageProps {
  posts: IPost[];
}

const PostPage = ({ posts }: PostPageProps) => {
  const { title } = useParams<{ title: string }>();

  const post = posts.find((p) => p.title === title);

  if (!post) {
    return <p>Article non trouvé.</p>;
  }

  return (
    <div className="post-page">
      <Post post={post} />
    </div>
  );
};

export default PostPage;
