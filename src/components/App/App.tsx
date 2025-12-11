import { useState } from "react";
import { useEffect } from "react";

import categoriesData from "../../data/categories";
import postsData from "../../data/posts";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";

import "./App.scss";
import { IArticle } from "../../@types";

function App() {
  // Indique si le mode zen est activé
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  // zenModeEnabled : variable pour lire la valeur actuelle
  // setZenModeEnabled : fonction qui permet de changer la valeur

  //Je crée un state pour manager mes posts
  const [posts, setPosts] = useState(postsData);

  //Je crée un state pour controler mon input search
  const [search, setSearch] = useState("");

  const [articles, setArticles] = useState<IArticle[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const httpRequest = await fetch(
        "https://oclock-api.vercel.app/api/blog/posts"
      );
      const data = await httpRequest.json();
      console.log(data);
      return setArticles(data);
    };
    fetchData();
  }, []);
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
      <Posts isZenModeEnabled={zenModeEnabled} articles={articles} />
      <Footer />
    </div>
  );
}

export default App;
