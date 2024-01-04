import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { HomePage } from "./Components/HomePage";
import { MoviesPopular } from "./Components/MoviesPopular";
import { Series } from "./Components/Series";
import { OneMovie } from "./Components/OneMovie";
import { OneSerie } from "./Components/OneSerie";
import { ActionMovies } from "./Components/ActionMovies";
import { ComedyMovies } from "./Components/ComedyMovies";
import { FavouritesShows } from "./Components/FavouritesShows";
import { Footer } from "./Components/Footer";
import "./style/style-heart.css";
import "./style/style-search.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="movies-app" element={<HomePage />} />
        <Route path="movies-app/movies-react-app" element={<HomePage />} />
        <Route path="movies-app/movies" element={<MoviesPopular />} />
        <Route path="movies-app/action-movies" element={<ActionMovies />} />
        <Route path="movies-app/comedy-movies" element={<ComedyMovies />} />
        <Route path="movies-app/series" element={<Series />} />
        <Route
          path="movies-app/favourite-shows"
          element={<FavouritesShows />}
        />
        <Route path="movies-app/movies/:id" element={<OneMovie />} />
        <Route path="movies-app/series/:id" element={<OneSerie />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
