import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useParams } from "react-router"


import postsData from "../../data/posts"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Posts from "../Posts/Posts"
import Post from "../Post/Post"

import "./App.scss"
import { ICategory, IPost } from "../../@types"

function App() {
  const categoriesEndpoint = "https://oclock-api.vercel.app/api/blog/categories"
  const postsEndpoint = "https://oclock-api.vercel.app/api/blog/posts"

  const [zenModeEnabled, setZenModeEnabled] = useState(false)
  const [posts, setPosts] = useState<IPost[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [search, setSearch] = useState("")
  const [postError, setPostError] = useState("")

  function handleChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim().toLowerCase()
    setSearch(value)
    const filteredPosts = postsData.filter((post) =>
      post.title.toLowerCase().includes(value)
    )
    setPosts(filteredPosts)
  }

  async function fetchPosts() {
    try {
      const response = await fetch(postsEndpoint)
      if (response.ok) {
        const postsFromApi = await response.json()
        setPosts(postsFromApi)
      } else {
        setPostError(
          "Une erreur est survenue, veuillez reessayer dans quelques minutes"
        )
      }
    } catch (e) {
      setPostError(
        e instanceof Error
          ? e.message
          : "Une erreur est survenue, veuillez reessayer dans quelques minutes"
      )
    }
  }

  async function fetchCategories() {
    const response = await fetch(categoriesEndpoint)
    const categoriesFromApi = await response.json()
    setCategories(categoriesFromApi)
  }

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [])

  // --- Pages internes ---
  function CategoryPage({ posts }: { posts: IPost[] }) {
    const { slug } = useParams<{ slug: string }>() // récupère le paramètre dans l'URL

    // filtre les posts dont la catégorie correspond au slug
    const filteredPosts = posts.filter(
      (post) => post.category.toLowerCase() === slug?.toLowerCase()
    )

    if (filteredPosts.length === 0) return <p>Aucun article pour cette catégorie</p>

    return <Posts posts={filteredPosts} isZenModeEnabled={false} />
  }

  function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD") // sépare les accents
    .replace(/[\u0300-\u036f]/g, "") // supprime les accents
    .replace(/[’'?,.]/g, "") // supprime ponctuation
    .replace(/[^a-z0-9]+/g, "-") // remplace tout le reste par "-"
    .replace(/^-|-$/g, "") // supprime les "-" début/fin
}

  function PostPage({ posts }: { posts: IPost[] }) {
    const { slug } = useParams<{ slug: string }>()
    const post = posts.find((p) => slugify(p.title) === slug)

    if (!post) return <p>Post non trouvé</p>

    return <Post post={post} />
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          categories={categories}
          isZenModeEnabled={zenModeEnabled}
          changeZenMode={setZenModeEnabled}
          search={search}
        />

        <Routes>
          {/* Accueil */}
          <Route
            path="/"
            element={
              <>
                <input
                  type="text"
                  className="search"
                  placeholder="Rechercher dans les articles..."
                  value={search}
                  onChange={handleChangeSearchInput}
                />
                {postError ? (
                  <p>{postError}</p>
                ) : (
                  <Posts posts={posts} isZenModeEnabled={zenModeEnabled} />
                )}
              </>
            }
          />

          {/* Page catégorie */}
          <Route path="/categ/:slug" element={<CategoryPage posts={posts} />} />

          {/* Page post */}
          <Route path="/post/:slug" element={<PostPage posts={posts} />} />

          {/* Fallback */}
          <Route path="*" element={<p>Page non trouvée</p>} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
