import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesPop } from "../features/movies/moviesPopularSlice";
import { fetchMoviesSearch } from "../features/movies/moviesSearchSlice";
import { addToFavourites } from "../features/favourites/favouritesShowSlice";
import { NavLink } from "react-router-dom";

export const MoviesPopular = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  let [movies] = useState([]);
  let [loading] = useState(false);
  let [error] = useState("");
  const moviesSearch = useSelector((state) => state.moviesSearch);
  const moviesPopular = useSelector((state) => state.moviesPopular);

  //------------

  useEffect(() => {
    dispatch(fetchMoviesPop());
  }, [dispatch]);

  //--------

  //--------

  useEffect(() => {
    if (searchValue.length > 0) {
      dispatch(fetchMoviesSearch(searchValue));
    }
  }, [searchValue, dispatch]);

  //-------------

  if (searchValue.length > 0) {
    movies = moviesSearch.moviesSearch;
    loading = moviesSearch.loading;
    error = moviesSearch.error;
  } else {
    movies = moviesPopular.moviesPopular;
    loading = moviesPopular.loading;
    error = moviesPopular.error;
  }
  //----------------------------------
  /*  const favouritesShows = useSelector(
    (state) => state.favouritesShow.favouritesShow
  );
  let checker = false; */
  return (
    <div>
      <input
        type="search"
        name="searchMovie"
        id="searchMovie"
        className="searchMovie m-1"
        placeholder="serach..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
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
              <NavLink to={`${elem.id}`} className="button">
                More details
              </NavLink>

              {/*  <i
                className="heart"
                onClick={(e) => dispatch(addToFavourites(elem))}
                title="Add to favourites"
              >
                &#9829;
              </i> */}
            </div>
            <div
              onClick={() => dispatch(addToFavourites(elem))}
              title="Add to favourites"
              className="addToFavourites-heart"
            >
              {/* {favouritesShows?.map((fs) =>
                fs.id === elem.id ? (checker = true) : (checker = false)
              )} */}
              <i
                className="fa-solid fa-heart heart"
                /* style={checker ? { color: "red" } : { color: "#6e6e6e" }} */
              ></i>
            </div>
          </div>
        ))}
        {!loading && error ? (
          <div className="display-4">Error : {error}</div>
        ) : null}
      </div>
    </div>
  );
};
