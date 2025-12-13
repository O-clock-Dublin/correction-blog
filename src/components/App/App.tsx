import "./App.scss"
import { useState, useEffect } from "react"
import { IPost } from "../../@types";
import categoriesData from "../../data/categories"
import Loader from "../Loader/Loader";
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Posts from "../Posts/Posts"

function App() {

  const [error, setError] = useState("");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Indique si le mode zen est activé
  const [zenModeEnabled, setZenModeEnabled] = useState(false)
  // zenModeEnabled : variable pour lire la valeur actuelle
  // setZenModeEnabled : fonction qui permet de changer la valeur

  //Je crée un state pour controler mon input search
  const [search, setSearch] = useState("")

  //Je crée la fonction qui me permet de mettre à jour le state search
  // dès que l'utilisateur tape sur le clavier
  function handleChangeSearchInput(e) {
    //Je récupère la valeur de l'input
    const value = e.target.value.trim().toLowerCase()
    setSearch(value)
    //filtrer les posts pour ne garder que les posts correspondant à la recherche
    const filteredPosts = datas.filter((post: IPost) =>
      post.title.toLowerCase().includes(value)
    )
    setDatas(filteredPosts)
  }

  useEffect( () => {
    async function fetchData() {
      try {
        const httpResponse = await fetch("https://oclock-api.vercel.app/api/blog/posts");
        if (!httpResponse.ok) {throw new Error("Erreur API")};
        const data =  await httpResponse.json();

        // Ajouter un délai artificiel de 3 secondes pour tester le loader
        await new Promise(resolve => setTimeout(resolve, 3000));

        setDatas(data);
        setLoading(false);
      }
      catch(err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    }
    fetchData();
  }, [])

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
      {error && <div className="error">{error}</div>}
      {loading && <Loader />}
      <Posts posts={datas} isZenModeEnabled={zenModeEnabled} />
      <Footer />
    </div>
  )
}

export default App
