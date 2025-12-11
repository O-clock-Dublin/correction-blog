import { useEffect, useState } from "react";

import categoriesData from "../../data/categories";
// import postsData from "../../data/posts";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import { IPost } from "../../@types";

import "./App.scss";

function App() {
  // Indique si le mode zen est activé
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  // zenModeEnabled : variable pour lire la valeur actuelle
  // setZenModeEnabled : fonction qui permet de changer la valeur

  // Create state to manage/stock error
  const [error, setError] = useState("");

  // Create state to stock posts (initial)
  const [posts, setPosts] = useState<IPost[]>([]);

  // Create function using useEffect to call API and stock data(posts)
  // useEffect(() => {SETUP}, [DEPENDENCIES])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const httpResponse = await fetch(
          "https://oclock-api.vercel.app/api/blog/posts"
        );

        if (!httpResponse.ok) {
          throw new Error("Echec de la récupération des articles");
        }

        const data: IPost[] = await httpResponse.json();
        setPosts(data);
        setError("");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error");
        }
      }
    };

    fetchPosts();
  }, []);

  // //Je crée un state pour manager mes posts
  // const [posts, setPosts] = useState(postsData)

  //Je crée un state pour controler mon input search
  const [search, setSearch] = useState("");

  //Je crée la fonction qui me permet de mettre à jour le state search
  // dès que l'utilisateur tape sur le clavier
  function handleChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    //Je récupère la valeur de l'input
    const value = e.target.value.trim().toLowerCase();
    setSearch(value);
    //filtrer les posts pour ne garder que les posts correspondant à la recherche
    const filteredPosts = posts.filter((post) =>
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

      {/* Condition to show error message if exists */}
      {error && <p className="error-message">{error}</p>}

      <Posts posts={posts} isZenModeEnabled={zenModeEnabled} />
      <Footer />
    </div>
  );
}

export default App;
