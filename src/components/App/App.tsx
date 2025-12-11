import { useState, useEffect } from "react";

import categoriesData from "../../data/categories";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";

import "./App.scss";
import { IPost } from "../../@types";

function App() {
  // Indique si le mode zen est activé
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  // zenModeEnabled : variable pour lire la valeur actuelle
  // setZenModeEnabled : fonction qui permet de changer la valeur

  //Je crée un state pour manager mes posts
  //const [posts, setPosts] = useState([postsData]);

  //Je crée un state pour controler mon input search
  const [search, setSearch] = useState("");

  const [datas, setDatas] = useState<IPost[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const httpResponse = await fetch(
          "https://oclock-api.vercel.app/api/blog/posts"
        );
        if (!httpResponse.ok) {
          throw new Error("Fetch error");
        }
        const dataArray = await httpResponse.json();
        console.log(dataArray);
        setDatas(dataArray);
      };
      fetchData();
    } catch (e) {
      setError(
        "Impossible de récupérer les données. Veuillez réessayer plus tard."
      );
    }
  }, []);

  //Je crée la fonction qui me permet de mettre à jour le state search
  // dès que l'utilisateur tape sur le clavier
  function handleChangeSearchInput(e: { target: { value: string } }) {
    //Je récupère la valeur de l'input
    const value = e.target.value.trim().toLowerCase();
    setSearch(value);
    //filtrer les posts pour ne garder que les posts correspondant à la recherche
    const filteredPosts = datas.filter((post) =>
      post.title.toLowerCase().includes(value)
    );
    setDatas(filteredPosts);
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
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Posts posts={datas} isZenModeEnabled={zenModeEnabled} />
      )}
      <Footer />
    </div>
  );
}

export default App;
