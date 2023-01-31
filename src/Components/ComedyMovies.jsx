import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComedyMovies } from "../features/movies/comedyMoviesSlice";
import { addToFavourites } from "../features/favourites/favouritesShowSlice";
import { NavLink } from "react-router-dom";

export const ComedyMovies = () => {
  const dispatch = useDispatch();
  let [movies] = useState([]);
  let [loading] = useState(false);
  let [error] = useState("");

  const comedyMovies = useSelector((state) => state.comedyMovies);

  movies = comedyMovies.comedyMovies;
  loading = comedyMovies.loading;
  error = comedyMovies.error;

  useEffect(() => {
    dispatch(fetchComedyMovies());
  }, [dispatch]);

  return (
    <div className="movies-container">
      {loading && (
        <div className="display-4" style={{ textAlign: "center" }}>
          loading...
        </div>
      )}
      {movies?.map((elem) => (
        <div className="movie-card mt-2" key={elem.id}>
          <img
            src={`https://image.tmdb.org/t/p/original${elem.poster_path}`}
            alt="Movie poster"
          />
          <div className="details">
            <div className="title">{elem.title}</div>
            <div className="rating">
              Rating: {elem.vote_average !== 0 ? elem.vote_average : "n/a"}
            </div>
            <div className="genres">
              {elem.release_date !== undefined
                ? "Year: " + elem.release_date.slice(0, 4)
                : null}
            </div>
            <NavLink to={`/movies/${elem.id}`} className="button">
              More details
            </NavLink>
          </div>
          <div
            onClick={() => dispatch(addToFavourites(elem))}
            title="Add to favourites"
            className="addToFavourites-heart"
          >
            <i className="fa-solid fa-heart heart"></i>
          </div>
        </div>
      ))}
      {!loading && error ? (
        <div className="display-4">Error : {error}</div>
      ) : null}
    </div>
  );
};
