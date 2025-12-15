import { IPost } from "../../@types"
import Posts from "../Posts/Posts"

interface PostsProps {
  posts: IPost[]
  postError: string
  zenModeEnabled: boolean
}

export default function PostsPage({
  zenModeEnabled,
  postError,
  posts,
}: PostsProps) {
  return (
    <div>
      {postError ? (
        <p>{postError}</p>
      ) : (
        <Posts posts={posts} isZenModeEnabled={zenModeEnabled} />
      )}
    </div>
  )
}
