import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesPop } from "../features/movies/moviesPopularSlice";
import { fetchTopRatedMovies } from "../features/movies/topRatedMoviesSlice";
import { fetchTopRatedSeries } from "../features/series/topRatedSeriesSlice";
import { addToFavourites } from "../features/favourites/favouritesShowSlice";
import { TopRated } from "./TopRated";
import { NavLink } from "react-router-dom";

export const HomePage = () => {
  const dispatch = useDispatch();
  const moviesPopular = useSelector((state) => state.moviesPopular);
  //console.log(moviesPopular.moviesPopular);
  let [movie] = useState({});
  let [loading] = useState(false);
  let [error] = useState("");

  useEffect(() => {
    dispatch(fetchMoviesPop());
  }, [dispatch]);

  movie = moviesPopular.moviesPopular[0];
  loading = moviesPopular.loading;
  error = moviesPopular.error;
  //---------fetch TOp rated movies ----------------
  let [topRatedMovies] = useState([]);
  let [topRated_Loading] = useState(false);
  let [topRated_Error] = useState("");

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);
  const topRatedMoviesS = useSelector((state) => state.topRatedMovies);
  //console.log(topRatedMoviesS.topRatedMovies[0]);

  topRatedMovies = topRatedMoviesS.topRatedMovies;
  topRated_Loading = topRatedMoviesS.loading;
  topRated_Error = topRatedMoviesS.error;
  //---------fetch TOp rated series ----------------
  let [topRatedSeries] = useState([]);
  let [topRatedS_Loading] = useState(false);
  let [topRatedS_Error] = useState("");

  useEffect(() => {
    dispatch(fetchTopRatedSeries());
  }, [dispatch]);
  const topRatedSeriesS = useSelector((state) => state.topRatedSeries);
  //console.log(topRatedSeriesS.topRatedSeries[0]);
  topRatedSeries = topRatedSeriesS.topRatedSeries;
  topRated_Loading = topRatedSeriesS.loading;
  topRated_Error = topRatedSeriesS.error;
  return (
    <div className="homepage-container">
      {loading && (
        <div className="display-4" style={{ textAlign: "center" }}>
          loading...
        </div>
      )}
      {!loading && error.length === 0 ? (
        <div
          className="home-movie-pop"
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/original${movie?.poster_path}`})`,
          }}
        >
          <div className="home-movie-pop-text">
            <h1 className="display-1">{movie?.title}</h1>
            <p className="display-6">{movie?.overview}</p>
            <NavLink
              to={`/movies-app/movies/${movie?.id}`}
              className="btn btn-dark button-homepage"
            >
              View details
            </NavLink>
            <div
              onClick={() => dispatch(addToFavourites(movie))}
              title="Add to favourites"
            >
              <i className="fa-solid fa-heart heartHH"></i>
            </div>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt={`Poster of the movie ${movie?.title}`}
          />
        </div>
      ) : (
        <div></div>
      )}
      <div
        style={{ background: "#000", color: "#fff" }}
        className="top-rated-pad"
      >
        <div className="top-rated-movies-tite">
          <div className="display-6">Top Rated Movies</div>
          <button className="btn btn-dark">
            <NavLink
              to={`/movies-app/movies`}
              style={{ color: "white", textDecoration: "none" }}
            >
              View More
            </NavLink>
          </button>
        </div>

        <div className="top-rated-movies-container">
          {topRatedMovies?.map((m) => (
            <TopRated
              key={m.id}
              id={m.id}
              poster_path={m.poster_path}
              title={m.title}
              loading={topRated_Loading}
              error={topRated_Error}
            />
          ))}
        </div>
      </div>
      {/* SERIES */}
      <div
        style={{ background: "#000", color: "#fff" }}
        className="top-rated-pad"
      >
        <div className="top-rated-movies-tite">
          <div className="display-6">Top Rated Series</div>
          <button className="btn btn-dark">
            <NavLink
              to={`/movies-app/series`}
              style={{ color: "white", textDecoration: "none" }}
            >
              View More
            </NavLink>
          </button>
        </div>

        <div className="top-rated-movies-container">
          {topRatedSeries?.map((m) => (
            <TopRated
              key={m.id}
              id={m.id}
              poster_path={m.poster_path}
              title={m.title}
              loading={topRatedS_Loading}
              error={topRatedS_Error}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
