import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchSeries } from "../features/series/seriesSlice";
import { fetchSeriesSearch } from "../features/series/seriesSearchSlice";
import { fetchSerieGenres } from "../features/series/seriesSlice";
import { fetchShowsByGenre } from "../features/shows/ShowsByGenreSlice";
import { addToFavourites } from "../features/favourites/favouritesShowSlice";
import { removeFromFavourites } from "../features/favourites/favouritesShowSlice";
import StarRating from "./comps/StarRating";
import { LoadingOverlay } from "./LoadingOverlay";
import { Tooltip } from "react-tooltip";

export const Series = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [genreValue, setGenreValue] = useState("");
  const [sortby, setSortBy] = useState("");
  const sortByvalues = [
    { id: 1, value: "Title Asc &uarr;" },
    { id: 2, value: "Title Desc &darr;" },
    { id: 3, value: "Best Rating &#x269D;" },
    { id: 4, value: "Release Date Asc &uarr;" },
    { id: 5, value: "Release Date Desc &darr;" },
  ];

  let [series, setSeries] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  useEffect(() => {
    const storedSearchValue = sessionStorage.getItem("searchvalue");
    const storedGenreValue = sessionStorage.getItem("genrevalue");
    const storedSortby = sessionStorage.getItem("sortbySeries");

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
    sessionStorage.setItem("searchvalue", searchValue);
    sessionStorage.setItem("genrevalue", genreValue);
    sessionStorage.setItem("sortbySeries", sortby);
  }, [searchValue, genreValue, sortby]);

  const removeSessionData = () => {
    sessionStorage.removeItem("searchvalue");
    sessionStorage.removeItem("genrevalue");
    sessionStorage.removeItem("sortbySeries");
    setSearchValue("");
    setGenreValue("");
    setSortBy("");
  };

  const darkModeStatu = useSelector((state) => state.darkMode.darkMode);
  const seriesGenres = useSelector((state) => state.series.serieGenres.genres);
  const seriesState = useSelector((state) => state.showsByGenre);
  const popSeries = useSelector((state) => state.series.series);
  const seriesSearch = useSelector((state) => state.seriesSearch);
  let favouriteShows = useSelector(
    (state) => state.favouritesShow
  ).favouritesShow;

  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSerieGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchShowsByGenre({ type: "tv", genre: genreValue }));
  }, [dispatch, genreValue]);

  useEffect(() => {
    dispatch(fetchSeriesSearch({ searchValue }));
  }, [searchValue, dispatch]);

  const sortShows = useCallback(
    (shows) => {
      const compareStrings = (a, b) => (a && b ? a.localeCompare(b) : 0);
      const compareDates = (a, b) => (a && b ? new Date(a) - new Date(b) : 0);

      switch (sortby) {
        case "1":
          return shows.slice().sort((a, b) => compareStrings(a.name, b.name));
        case "2":
          return shows.slice().sort((a, b) => compareStrings(b.name, a.name));
        case "3":
          return shows.slice().sort((a, b) => b.vote_average - a.vote_average);
        case "4":
          return shows
            .slice()
            .sort((a, b) => compareDates(a.first_air_date, b.first_air_date));
        case "5":
          return shows
            .slice()
            .sort((a, b) => compareDates(b.first_air_date, a.first_air_date));
        default:
          return shows;
      }
    },
    [sortby]
  );

  useEffect(() => {
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
        return sortShows(updatedMovies2, sortby);
      }
      return sortShows(updatedMovies, sortby);
    }

    if (searchValue.length > 0) {
      setSeries(checkIsFavs(seriesSearch.seriesSearch, true, genreValue));
      setLoading(seriesSearch.loading);
      setError(seriesSearch.error);
    } else {
      if (genreValue === "") {
        setSeries(checkIsFavs(popSeries, false, genreValue));
      } else {
        setSeries(checkIsFavs(seriesState.shows, false, genreValue));
      }
      setLoading(seriesState.loading);
      setError(seriesState.error);
    }
  }, [
    searchValue,
    seriesState,
    genreValue,
    seriesSearch,
    popSeries,
    favouriteShows,
    sortby,
    sortShows,
  ]);

  //-------------

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

  return (
    <div>
      <div className="form__group field">
        <input
          type="search"
          className="form__field"
          placeholder="Title"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label htmlFor="name" className="form__label">
          Title
        </label>
        <div className="d-flex flex-column">
          <select
            className="filter-select"
            name="selectfilter"
            id="selectfilter"
            title="Serie Genres"
            onChange={(e) => setGenreValue(e.target.value)}
            value={genreValue}
          >
            <option value="">Popular</option>
            {seriesGenres?.map((gn) => (
              <option key={gn.id} value={`${gn.id}`}>
                {gn.name}
              </option>
            ))}
          </select>
        </div>
        <select
          name="sortby"
          id="sortby"
          className="filter-select"
          value={sortby}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By:</option>
          {sortByvalues.map((e) => (
            <option
              key={e.id}
              value={e.id}
              dangerouslySetInnerHTML={{ __html: e.value }}
            ></option>
          ))}
        </select>
        {!loading && (searchValue.length > 0 || genreValue.length > 0) ? (
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
                  alt={c.name + " serie poster"}
                />
                <div className="details">
                  <div className="title">
                    {c.name +
                      (c.first_air_date
                        ? " (" + c.first_air_date.slice(0, 4) + ")"
                        : null)}
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
                  <div className="addToFavourites-heart">
                    <div className="con-like">
                      <input
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, c)
                        }
                        className="like"
                        type="checkbox"
                        checked={c.ischecked}
                        data-tooltip-id={c.id}
                        data-tooltip-content={
                          c.ischecked
                            ? "Remove from Favourites"
                            : "Add to Favourites"
                        }
                      />
                      <Tooltip id={c.id} place="right-end" />
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
