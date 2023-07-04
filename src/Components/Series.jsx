import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchSeries } from "../features/series/seriesSlice";
import { fetchSeriesSearch } from "../features/series/seriesSearchSlice";
import { addToFavourites } from "../features/favourites/favouritesShowSlice";

export const Series = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  let [series] = useState([]);
  let [loading] = useState(false);
  let [error] = useState("");

  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);
  //--------
  const seriesState = useSelector((state) => state.series);
  //-------------
  useEffect(() => {
    if (searchValue.length > 0) {
      dispatch(fetchSeriesSearch(searchValue));
    }
  }, [searchValue, dispatch]);
  const seriesSearch = useSelector((state) => state.seriesSearch);
  //console.log(seriesSearch);
  if (searchValue.length > 0) {
    series = seriesSearch.seriesSearch;
    loading = seriesSearch.loading;
    error = seriesSearch.error;
  } else {
    series = seriesState.series;

    loading = seriesState.loading;
    error = seriesState.error;
  }

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
        {!loading && series.length > 0
          ? series.map((c) => (
              <div className="movie-card mt-2" key={c.id}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${c.poster_path}`}
                  alt="Movie poster"
                />
                <div className="details">
                  <div className="title">{c.name}</div>
                  <div className="rating">Rating: {c.vote_average}</div>
                  {/* <div className="genres">Year: {c.release_date.slice(0, 4)}</div> */}
                  <NavLink to={`/movies-app/series/${c.id}`} className="button">
                    More details
                  </NavLink>
                </div>
                <div
                  onClick={() => dispatch(addToFavourites(c))}
                  title="Add to favourites"
                  className="addToFavourites-heart"
                >
                  <i className="fa-solid fa-heart heart"></i>
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
