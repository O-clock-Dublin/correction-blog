import { useEffect, useState } from "react"

import categoriesData from "../../data/categories"
import postsData from "../../data/posts"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Posts from "../Posts/Posts"

import "./App.scss"
import { ICategory, IPost } from "../../@types"

function App() {
  //Je prépare mes endpoints dans des constantes
  const categoriesEndpoint = "https://oclock-api.vercel.app/api/blog/categories"
  const postsEndpoint = "https://oclock-api.vercel.app/api/blog/posts"

  // Indique si le mode zen est activé
  const [zenModeEnabled, setZenModeEnabled] = useState(false)
  // zenModeEnabled : variable pour lire la valeur actuelle
  // setZenModeEnabled : fonction qui permet de changer la valeur

  //Je crée un state pour manager mes posts
  // Terminé le tableau "Mockup", maintenant on va consommer une API
  // On initialise donc le state à un tableau vide
  const [posts, setPosts] = useState<IPost[]>([])

  //Je crée un state qui accueillera mes categories (via API)
  //Initialisation à vide
  //Pour une hydratation via useEffect plus tard
  const [categories, setCategories] = useState<ICategory[]>([])

  //Je crée un state pour controler mon input search
  const [search, setSearch] = useState("")

  //Je crée un state qui va manager les possibles erreurs liées à la récupération des posts via API
  const [postError, setPostError] = useState("")

  //Je crée la fonction qui me permet de mettre à jour le state search
  // dès que l'utilisateur tape sur le clavier
  function handleChangeSearchInput(e) {
    //Je récupère la valeur de l'input
    const value = e.target.value.trim().toLowerCase()
    setSearch(value)
    //filtrer les posts pour ne garder que les posts correspondant à la recherche
    const filteredPosts = postsData.filter((post) =>
      post.title.toLowerCase().includes(value)
    )
    setPosts(filteredPosts)
  }

  // Je prépare la fonction asynchrone qui va chercher les posts
  async function fetchPosts() {
    try {
      // Etape une, je vais aller chercher une Promise via fetch
      // On récupérera via cette Promise, soit les données, soit une erreur
      // Sous forme de Promise = NON AFFICHABLE sur une interface front
      const response = await fetch(postsEndpoint)
      console.log(response)
      //Je vérifie si la response est ok pour hydrater Soit le tableau de posts, soit l'erreur à afficher à l'utilisateur
      // Etape deux, je transforme la Promise en données exploitables
      if (response.ok) {
        const postsFromApi = await response.json()
        //J'hydrate mon state posts via le setter
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
    console.log(response)
    const categoriesFromApi = await response.json()
    setCategories(categoriesFromApi)
  }

  //Je prépare un useEffect afin d'aller chercher mes posts via l'api
  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [])

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
      {postError ? (
        <p>{postError}</p>
      ) : (
        <Posts posts={posts} isZenModeEnabled={zenModeEnabled} />
      )}
      <Footer />
    </div>
  )
}

export default App
