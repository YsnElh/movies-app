import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { HomePage } from "./Components/HomePage";
import { MoviesPopular } from "./Components/MoviesPopular";
import { Series } from "./Components/Series";
import { OneMovie } from "./Components/OneMovie";
import { OneSerie } from "./Components/OneSerie";
import { FavouritesShows } from "./Components/FavouritesShows";
import { Footer } from "./Components/Footer";
import { PopularPersons } from "./Components/PopularPersons";
import { Person } from "./Components/Person";
import "./style/App.css";
import "./style/style-heart.css";
import "./style/style-search.css";
import ReactGA from "react-ga";

function App() {
  // google analytics tracking
  const gaTrackCode = process.env.REACT_APP_GA_TRACKING_CODE;
  ReactGA.initialize(gaTrackCode);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <Navbar />
      <Routes basename="/movies-app/">
        <Route path="movies-app" element={<HomePage />} />
        <Route path="movies-app/movies-react-app" element={<HomePage />} />
        <Route path="movies-app/movies" element={<MoviesPopular />} />
        <Route path="movies-app/series" element={<Series />} />
        <Route
          path="movies-app/favourite-shows"
          element={<FavouritesShows />}
        />
        <Route path="movies-app/person" element={<PopularPersons />} />
        <Route path="movies-app/movies/:id" element={<OneMovie />} />
        <Route path="movies-app/series/:id" element={<OneSerie />} />
        <Route path="movies-app/persons" element={<PopularPersons />} />
        <Route path="movies-app/person/:id" element={<Person />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
