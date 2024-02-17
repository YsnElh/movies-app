import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesSearch } from "../features/movies/moviesSearchSlice";
import { fetchShowsByGenre } from "../features/shows/ShowsByGenreSlice";
import { fetchMovieGenres } from "../features/movies/moviesPopularSlice";
import {
  addToFavourites,
  removeFromFavourites,
} from "../features/favourites/favouritesShowSlice";
import { NavLink } from "react-router-dom";
import StarRating from "./comps/StarRating";
import { LoadingOverlay } from "./LoadingOverlay";
import { Tooltip } from "react-tooltip";

export const MoviesPopular = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [genreValue, setGenreValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const sortByValues = [
    { id: 1, value: "Title Asc &uarr;" },
    { id: 2, value: "Title Desc &darr;" },
    { id: 3, value: "Best Rating &#x269D;" },
    { id: 4, value: "Release Date Asc &uarr;" },
    { id: 5, value: "Release Date Desc &darr;" },
  ];

  let [movies, setMovies] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  const moviesSearch = useSelector((state) => state.moviesSearch);
  const moviesPopular = useSelector((state) => state.showsByGenre);
  const movieGenres = useSelector(
    (state) => state.moviesPopular?.movieGenres?.genres
  );
  const darkModeStatu = useSelector((state) => state.darkMode.darkMode);
  let favouriteShows = useSelector(
    (state) => state.favouritesShow.favouritesShow
  );

  useEffect(() => {
    const storedSearchValue = sessionStorage.getItem("searchvalueMovie");
    const storedGenreValue = sessionStorage.getItem("genrevalueMovie");
    const storedSortby = sessionStorage.getItem("sortbyMovie");

    if (storedSearchValue) {
      setSearchValue(storedSearchValue);
    }
    if (storedGenreValue) {
      setGenreValue(storedGenreValue);
    }
    if (storedSortby) {
      setSortBy(storedSortby);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("searchvalueMovie", searchValue);
    sessionStorage.setItem("genrevalueMovie", genreValue);
    sessionStorage.setItem("sortbyMovie", sortBy);
  }, [searchValue, genreValue, sortBy]);

  const removeSessionData = () => {
    sessionStorage.removeItem("searchvalueMovie");
    sessionStorage.removeItem("genrevalueMovie");
    sessionStorage.removeItem("sortbyMovie");

    setSearchValue("");
    setGenreValue("");
    setSortBy("");
  };
  //------------
  useEffect(() => {
    dispatch(fetchShowsByGenre({ type: "movie", genre: genreValue }));
  }, [dispatch, genreValue]);

  useEffect(() => {
    dispatch(fetchMovieGenres());
  }, [dispatch]);

  //--------
  const handleCheckboxChange = (isChecked, elem) => {
    if (isChecked) {
      dispatch(
        addToFavourites({
          id: elem.id,
          title: elem.title,
          poster_path: elem.poster_path,
          vote_average: elem.vote_average,
          adult: elem.adult,
          show_type: "movie",
        })
      );
    } else {
      dispatch(removeFromFavourites({ id: elem.id, show_type: "movie" }));
    }
  };
  //--------

  useEffect(() => {
    if (searchValue.length > 0) {
      dispatch(fetchMoviesSearch({ searchValue }));
    }
  }, [searchValue, dispatch]);
  //-------------

  useEffect(() => {
    if (searchValue.length > 0) {
      setMovies(
        checkIsFavs(moviesSearch.moviesSearch, true, genreValue, sortBy)
      );
      setLoading(moviesSearch.loading);
      setError(moviesSearch.error);
    } else {
      setMovies(checkIsFavs(moviesPopular.shows, false, genreValue, sortBy));
      setLoading(moviesPopular.loading);
      setError(moviesPopular.error);
    }
    function checkIsFavs(movies, searchValExist, genre, sortVal) {
      if (!Array.isArray(favouriteShows)) {
        console.error("favouriteShows is not an array");
        return;
      }
      const updatedMovies = movies.map((movie) => {
        const isFavourite = favouriteShows.some(
          (show) => show.id === movie.id && show.show_type === "movie"
        );
        return { ...movie, ischecked: isFavourite };
      });
      if (searchValExist && genre.length > 0) {
        const updatedMovies2 = updatedMovies.filter((movie) =>
          movie.genre_ids.includes(parseInt(genre))
        );
        return sortShows(updatedMovies2, sortVal);
      }
      return sortShows(updatedMovies, sortVal);
    }
    function sortShows(shows, sortVal) {
      const compareStrings = (a, b) => (a && b ? a.localeCompare(b) : 0);
      const compareDates = (a, b) => (a && b ? new Date(a) - new Date(b) : 0);

      switch (sortVal) {
        case "1":
          return shows.slice().sort((a, b) => compareStrings(a.title, b.title));
        case "2":
          return shows.slice().sort((a, b) => compareStrings(b.title, a.title));
        case "3":
          return shows.slice().sort((a, b) => b.vote_average - a.vote_average);
        case "4":
          return shows
            .slice()
            .sort((a, b) => compareDates(a.release_date, b.release_date));
        case "5":
          return shows
            .slice()
            .sort((a, b) => compareDates(b.release_date, a.release_date));
        default:
          return shows;
      }
    }
  }, [
    favouriteShows,
    genreValue,
    moviesPopular,
    moviesSearch,
    searchValue,
    sortBy,
  ]);
  //console.table(movies);

  return (
    <div className="movies-general-container">
      <div className="form__group field">
        <input
          type="search"
          className="form__field"
          placeholder="Title"
          id="movie-title-search"
          title="search movie by title"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label htmlFor="movie-title-search" className="form__label">
          Title
        </label>
        <select
          className="filter-select"
          name="selectfilter"
          id="selectfilter"
          title="Movie genres"
          onChange={(e) => setGenreValue(e.target.value)}
          value={genreValue}
        >
          <option value="">All genres</option>
          {movieGenres?.map((gn) => (
            <option key={gn.id} value={`${gn.id}`}>
              {gn.name}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          id="sortby"
          title="Sort By"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="">Sort By:</option>
          {sortByValues.map((e) => (
            <option
              key={e.id}
              value={e.id}
              dangerouslySetInnerHTML={{ __html: e.value }}
            ></option>
          ))}
        </select>
        {!loading &&
        (searchValue.length > 0 ||
          genreValue.length > 0 ||
          sortBy.length > 0) ? (
          <button
            className="btn btn-outline-light"
            title="Clear Search data"
            onClick={() => removeSessionData()}
          >
            Clear Search
          </button>
        ) : null}
      </div>
      <div className="movies-container">
        {loading && <LoadingOverlay />}
        {movies && movies.length === 0 && searchValue.length > 0 && !loading ? (
          <div
            className={`display-4 ${!darkModeStatu ? "text-light" : null}`}
            style={{ textAlign: "center" }}
          >
            There is no movies based on this search: {searchValue}!
          </div>
        ) : null}
        {!loading && error.length === 0
          ? movies?.map((elem) => (
              <div className="movie-card mt-2" key={elem.id}>
                {/* <LoadingOverlay isLoading={false} /> */}
                <img
                  className="card-img"
                  src={
                    elem.poster_path
                      ? `https://image.tmdb.org/t/p/original${elem.poster_path}`
                      : "/movies-app/poster-not-found.jpg"
                  }
                  alt={elem.title + " movie poster"}
                />
                <div className="details">
                  <div className="title">
                    {elem.title +
                      (elem.release_date
                        ? " (" + elem.release_date.slice(0, 4) + ")"
                        : null)}
                  </div>
                  <div className="rating">
                    <StarRating rating={elem.vote_average?.toFixed(1)} />
                  </div>
                  <NavLink
                    to={`/movies-app/movies/${elem.id}`}
                    className="btn-card"
                  >
                    More details
                  </NavLink>
                  <div className="addToFavourites-heart">
                    <div className="con-like">
                      <input
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, elem)
                        }
                        className="like"
                        type="checkbox"
                        checked={elem.ischecked}
                        data-tooltip-id={elem.id}
                        data-tooltip-content={
                          elem.ischecked
                            ? "Remove from Favourites"
                            : "Add to Favourites"
                        }
                      />
                      <Tooltip id={elem.id} place="right-end" />
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
