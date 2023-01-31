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
import { UpComp } from "./Components/UpComp";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies-app" element={<HomePage />} />
        <Route path="movies-react-app" element={<HomePage />} />
        <Route path="movies" element={<MoviesPopular />} />
        <Route path="action-movies" element={<ActionMovies />} />
        <Route path="comedy-movies" element={<ComedyMovies />} />
        <Route path="series" element={<Series />} />
        <Route path="favourite-shows" element={<FavouritesShows />} />
        <Route path="movies/:id" element={<OneMovie />} />
        <Route path="series/:id" element={<OneSerie />} />
      </Routes>
      <Footer />
      <UpComp />
    </>
  );
}

export default App;
