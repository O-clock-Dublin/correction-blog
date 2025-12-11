import { useEffect, useState } from "react";

import categoriesData from "../../data/categories";
import postsData from "../../data/posts";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";

import "./App.scss";

function App() {
  // Indique si le mode zen est activé
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  // zenModeEnabled : variable pour lire la valeur actuelle
  // setZenModeEnabled : fonction qui permet de changer la valeur

  // Create state to stock posts (initial)
  const [posts, setPosts] = useState([]);

  // Create function using useEffect to call API and stock data(posts)
  // useEffect(() => {SETUP}, [DEPENDENCIES])
  useEffect(async () => {
    // Call API
    const httpResponse = await fetch(
      "https://oclock-api.vercel.app/api/blog/posts"
    );
    // Get data in json
    const data = await httpResponse.json();

    // stock new data in
    return setPosts(data);
  }, []);

  // //Je crée un state pour manager mes posts
  // const [posts, setPosts] = useState(postsData)

  //Je crée un state pour controler mon input search
  const [search, setSearch] = useState("");

  //Je crée la fonction qui me permet de mettre à jour le state search
  // dès que l'utilisateur tape sur le clavier
  function handleChangeSearchInput(e) {
    //Je récupère la valeur de l'input
    const value = e.target.value.trim().toLowerCase();
    setSearch(value);
    //filtrer les posts pour ne garder que les posts correspondant à la recherche
    const filteredPosts = postsData.filter((post) =>
      post.title.toLowerCase().includes(value)
    );
    setPosts(filteredPosts);
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
  );
}

export default App;
