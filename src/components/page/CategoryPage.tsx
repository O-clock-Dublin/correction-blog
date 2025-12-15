import { useParams } from "react-router"
import { IPost } from "../../@types"
import Posts from "../Posts/Posts"

export default function CategoryPage({
  posts,
  zenModeEnabled,
}: {
  posts: IPost[]
  zenModeEnabled: boolean
}) {
  const param = useParams()
  const category = param.route

  const filteredPosts = posts.filter(
    (post) => post.category.toLowerCase() === category?.toLowerCase()
  )

  console.log(filteredPosts)
  return (
    <div>
      <h1>Category : {category}</h1>
      {filteredPosts.length > 0 ? (
        <Posts posts={filteredPosts} isZenModeEnabled={zenModeEnabled} />
      ) : (
        <p>Aucun post pour cette catégorie</p>
      )}
    </div>
  )
}
