import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchSeries } from "../features/series/seriesSlice";
import { fetchSeriesSearch } from "../features/series/seriesSearchSlice";
import { addToFavourites } from "../features/favourites/favouritesShowSlice";
import { removeFromFavourites } from "../features/favourites/favouritesShowSlice";

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

  const handleCheckboxChange = (isChecked, elem) => {
    if (isChecked) {
      dispatch(addToFavourites(elem));
    } else {
      dispatch(removeFromFavourites(elem.id));
    }
  };
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
            ))
          : null}
        {!loading && error ? (
          <div className="display-4">Error : {error}</div>
        ) : null}
      </div>
    </div>
  );
};
