import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchSeries } from "../features/series/seriesSlice";
import { fetchSeriesSearch } from "../features/series/seriesSearchSlice";
import { fetchSerieGenres } from "../features/series/seriesSlice";
import { fetchShowsByGenre } from "../features/shows/ShowsByGenreSlice";
import { addToFavourites } from "../features/favourites/favouritesShowSlice";
import { removeFromFavourites } from "../features/favourites/favouritesShowSlice";
import StarRating from "./comps/StarRating";

export const Series = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [genreValue, setGenreValue] = useState("");

  let [series] = useState([]);
  let [loading] = useState(false);
  let [error] = useState("");
  const darkModeStatu = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSerieGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchShowsByGenre({ type: "tv", genre: genreValue }));
  }, [dispatch, genreValue]);
  //--------

  const seriesState = useSelector((state) => state.showsByGenre);

  const seriesGenres = useSelector((state) => state.series.serieGenres.genres);

  let favouriteShows = useSelector(
    (state) => state.favouritesShow
  ).favouritesShow;
  //-------------
  useEffect(() => {
    if (searchValue.length > 0) {
      dispatch(fetchSeriesSearch(searchValue));
    }
  }, [searchValue, dispatch]);
  const seriesSearch = useSelector((state) => state.seriesSearch);
  //console.log(seriesSearch);
  if (searchValue.length > 0) {
    series = checkIsFavs(seriesSearch.seriesSearch, true, genreValue);
    loading = seriesSearch.loading;
    error = seriesSearch.error;
  } else {
    series = checkIsFavs(seriesState.shows, false, genreValue);
    loading = seriesState.loading;
    error = seriesState.error;
  }

  const handleCheckboxChange = (isChecked, elem) => {
    if (isChecked) {
      dispatch(
        addToFavourites({
          id: elem.id,
          title: elem.name,
          poster_path: elem.poster_path,
          vote_average: elem.vote_average,
          adult: elem.adult,
          show_type: "serie",
        })
      );
    } else {
      dispatch(removeFromFavourites({ id: elem.id, show_type: "serie" }));
    }
  };
  function checkIsFavs(series, searchValExist, genre) {
    if (!Array.isArray(favouriteShows)) {
      console.error("favouriteShows is not an array");
      return;
    }
    const updatedMovies = series.map((serie) => {
      const isFavourite = favouriteShows.some(
        (show) =>
          show.id === serie.id &&
          show.title === serie.name &&
          show.show_type === "serie"
      );
      return { ...serie, ischecked: isFavourite };
    });
    if (searchValExist && genre.length > 0) {
      const updatedMovies2 = updatedMovies.filter((movie) =>
        movie.genre_ids.includes(parseInt(genre))
      );
      return updatedMovies2;
    }
    return updatedMovies;
  }
  return (
    <div>
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder="Title"
          required=""
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          className="filter-select mt-2"
          name="selectfilter"
          id="selectfilter"
          onChange={(e) => setGenreValue(e.target.value)}
        >
          <option value="">All</option>
          {seriesGenres?.map((gn) => (
            <option key={gn.id} value={`${gn.id}`}>
              {gn.name}
            </option>
          ))}
        </select>
        <label htmlFor="name" className="form__label">
          Title
        </label>
      </div>
      <div className="movies-container">
        {loading && (
          <div
            className={`display-4 ${!darkModeStatu ? "text-light" : null}`}
            style={{ textAlign: "center" }}
          >
            <div className="spinner-container">
              <div className="spinner">
                <div className="spinner">
                  <div className="spinner">
                    <div className="spinner">
                      <div className="spinner">
                        <div className="spinner"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>LOADING...</div>
          </div>
        )}
        {!loading &&
        series &&
        series.length === 0 &&
        searchValue.length > 0 &&
        !loading ? (
          <div
            className={`display-4 ${!darkModeStatu ? "text-light" : null}`}
            style={{ textAlign: "center" }}
          >
            There is no series based on this search: {searchValue}!
          </div>
        ) : null}
        {!loading && series.length > 0 && error.length === 0
          ? series.map((c) => (
              <div className="movie-card mt-2" key={c.id}>
                <img
                  className="card-img"
                  src={
                    c.poster_path
                      ? `https://image.tmdb.org/t/p/original/${c.poster_path}`
                      : "/movies-app/poster-not-found.jpg"
                  }
                  alt="Movie poster"
                />
                <div className="details">
                  <div className="title">{c.name}</div>
                  <div className="genres">
                    Year:{" "}
                    {c.first_air_date ? c.first_air_date.slice(0, 4) : "N/A"}
                  </div>
                  <div className="rating">
                    <StarRating rating={c.vote_average?.toFixed(1)} />
                  </div>
                  <NavLink
                    to={`/movies-app/series/${c.id}`}
                    className="btn-card mt-2"
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
                          handleCheckboxChange(e.target.checked, c)
                        }
                        className="like"
                        type="checkbox"
                        title="like"
                        checked={c.ischecked}
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
          <div className={`display-4 ${!darkModeStatu ? "text-light" : null}`}>
            Error : {error}
          </div>
        ) : null}
      </div>
    </div>
  );
};
