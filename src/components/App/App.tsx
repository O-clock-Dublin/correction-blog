import { useState, useEffect } from "react"

import { IPost } from "../../@types"
import categoriesData from "../../data/categories"
import postsData from "../../data/posts"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Posts from "../Posts/Posts"

import "./App.scss"

function App() {
  // Indique si le mode zen est activé
  const [zenModeEnabled, setZenModeEnabled] = useState(false)
  // zenModeEnabled : variable pour lire la valeur actuelle
  // setZenModeEnabled : fonction qui permet de changer la valeur

  //Je crée un state pour manager mes posts
  // Initialisé avec un tableau vide, on le remplira avec les données de l'API
  const [posts, setPosts] = useState<IPost[]>([])

  // Au premier rendu du composant, on récupère les articles depuis l'API
  useEffect(() => {
    // Créé et execute une fonction asynchrone qui fait le call API
    async function fetchPosts() {
      // le call API
      const response = await fetch("https://oclock-api.vercel.app/api/blog/posts")
      const data = await response.json()
      // l'enregistrement des posts reçus dans le state
      setPosts(data)
    }

    fetchPosts()
  }, [])

  //Je crée un state pour controler mon input search
  const [search, setSearch] = useState("")

  //Je crée la fonction qui me permet de mettre à jour le state search
  // dès que l'utilisateur tape sur le clavier
  function handleChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    //Je récupère la valeur de l'input
    const value = e.target.value.trim().toLowerCase()
    setSearch(value)
    //filtrer les posts pour ne garder que les posts correspondant à la recherche
    const filteredPosts = postsData.filter((post) =>
      post.title.toLowerCase().includes(value)
    )
    setPosts(filteredPosts)
  }

  //Fonction inutile en l'etat mais décompose le process de filtrage des posts
  //Je crée une fonction qui va filtrer mes posts
  // En rapport avec les mots remplis par l'utilisateur
  // function handlePosts() {
  //   //Récupérer l'input utilisateur
  //   const userResearch = search.toLowerCase().trim()
  //   //Récupérer tous les posts
  //   const duplicatedPosts = postsData
  //   //filtrer les posts pour ne garder que les posts correspondant à la recherche
  //   const filteredPosts = duplicatedPosts.filter((post) =>
  //     post.title.toLowerCase().includes(userResearch)
  //   )
  //   setPosts(filteredPosts)
  // }

  return (
    <div className="app">
      <Header
        categories={categoriesData}
        isZenModeEnabled={zenModeEnabled}
        changeZenMode={setZenModeEnabled}
        search={search}
      />
      <input
        type="text"
        className="search"
        placeholder="Rechercher dans les articles..."
        value={search}
        onChange={handleChangeSearchInput}
      />
      <Posts posts={posts} isZenModeEnabled={zenModeEnabled} />
      <Footer />
    </div>
  )
}

export default App
