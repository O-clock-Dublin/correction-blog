import Posts from "../components/Posts/Posts";

export default function PostsPage({zenModeEnabled, postError, posts}) {
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