import { useState } from 'react';

import categoriesData from '../../data/categories';
import postsData from '../../data/posts';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';

import './App.scss';

function App() {
  // Indique si le mode zen est activé
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  // zenModeEnabled : variable pour lire la valeur actuelle
  // setZenModeEnabled : fonction qui permet de changer la valeur

  return (
    <div className="app">
      <Header
        categories={categoriesData}
        isZenModeEnabled={zenModeEnabled}
        changeZenMode={setZenModeEnabled}
      />
      <Posts posts={postsData} isZenModeEnabled={zenModeEnabled} />
      <Footer />
    </div>
  );
}

export default App;
