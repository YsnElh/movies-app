import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesPop } from "../features/movies/moviesPopularSlice";
import { fetchMoviesSearch } from "../features/movies/moviesSearchSlice";
import { addToFavourites } from "../features/favourites/favouritesShowSlice";
import { removeFromFavourites } from "../features/favourites/favouritesShowSlice";
import { NavLink } from "react-router-dom";
import StarRating from "./comps/StarRating";

export const MoviesPopular = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  let [movies] = useState([]);
  let [loading] = useState(false);
  let [error] = useState("");

  const moviesSearch = useSelector((state) => state.moviesSearch);
  const moviesPopular = useSelector((state) => state.moviesPopular);
  let favouriteShows = useSelector(
    (state) => state.favouritesShow
  ).favouritesShow;

  //------------

  useEffect(() => {
    dispatch(fetchMoviesPop());
  }, [dispatch]);

  //--------
  const handleCheckboxChange = (isChecked, elem) => {
    if (isChecked) {
      dispatch(addToFavourites(elem));
    } else {
      dispatch(removeFromFavourites(elem.id));
    }
  };
  //--------

  useEffect(() => {
    if (searchValue.length > 0) {
      dispatch(fetchMoviesSearch(searchValue));
    }
  }, [searchValue, dispatch]);

  //-------------

  if (searchValue.length > 0) {
    movies = checkIsFavs(moviesSearch.moviesSearch);
    loading = moviesSearch.loading;
    error = moviesSearch.error;
  } else {
    movies = checkIsFavs(moviesPopular.moviesPopular);
    loading = moviesPopular.loading;
    error = moviesPopular.error;
  }

  function checkIsFavs(movies) {
    if (!Array.isArray(favouriteShows)) {
      console.error("favouriteShows is not an array");
      return;
    }
    const updatedMovies = movies.map((movie) => {
      const isFavourite = favouriteShows.some((show) => show.id === movie.id);
      return { ...movie, ischecked: isFavourite };
    });
    return updatedMovies;
  }

  return (
    <div className="movies-general-container">
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder="Title"
          required=""
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label htmlFor="name" className="form__label">
          Title
        </label>
      </div>
      <div className="movies-container">
        {loading && (
          <div className="display-4" style={{ textAlign: "center" }}>
            loading...
          </div>
        )}
        {movies && movies.length === 0 && searchValue.length > 0 && !loading ? (
          <div className="display-4" style={{ textAlign: "center" }}>
            There is no movies based on this search: {searchValue}!
          </div>
        ) : null}
        {!loading && error.length === 0
          ? movies?.map((elem) => (
              <div className="movie-card mt-2" key={elem.id}>
                <img
                  className="card-img"
                  src={`https://image.tmdb.org/t/p/original${elem.poster_path}`}
                  alt="Movie poster"
                />
                <div className="details">
                  <div className="title">{elem.title}</div>
                  <div className="genres">
                    {elem.release_date !== undefined
                      ? "Year: " + elem.release_date.slice(0, 4)
                      : null}
                  </div>
                  <div className="rating">
                    <StarRating rating={elem.vote_average} />
                  </div>
                  <NavLink
                    to={`/movies-app/movies/${elem.id}`}
                    className="btn-card"
                  >
                    More details
                  </NavLink>
                  <div
                    title="Add to favourites"
                    className="addToFavourites-heart"
                  >
                    <div className="con-like">
                      <input
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, elem)
                        }
                        className="like"
                        type="checkbox"
                        title="like"
                        checked={elem.ischecked}
                      />
                      <div className="checkmark">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="outline"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="filled"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="100"
                          width="100"
                          className="celebrate"
                        >
                          <polygon
                            className="poly"
                            points="10,10 20,20"
                          ></polygon>
                          <polygon
                            className="poly"
                            points="10,50 20,50"
                          ></polygon>
                          <polygon
                            className="poly"
                            points="20,80 30,70"
                          ></polygon>
                          <polygon
                            className="poly"
                            points="90,10 80,20"
                          ></polygon>
                          <polygon
                            className="poly"
                            points="90,50 80,50"
                          ></polygon>
                          <polygon
                            className="poly"
                            points="80,80 70,70"
                          ></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
        {!loading && error ? (
          <div className="display-4">Error : {error}</div>
        ) : null}
      </div>
    </div>
  );
};
