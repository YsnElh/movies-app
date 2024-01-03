import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourites } from "../features/favourites/favouritesShowSlice";
import { destroyFavourites } from "../features/favourites/favouritesShowSlice";
import { NavLink } from "react-router-dom";
import StarRating from "./comps/StarRating";

export const FavouritesShows = () => {
  const dispatch = useDispatch();
  const favouritesShows = useSelector(
    (state) => state.favouritesShow.favouritesShow
  );

  const darkModeStatu = useSelector((state) => state.darkMode.darkMode);

  return (
    <>
      {favouritesShows.length > 0 ? (
        <button
          className="btn btn-outline-danger m-1"
          onClick={() => dispatch(destroyFavourites())}
        >
          Clear favourites
        </button>
      ) : null}

      <div className="movies-container">
        {favouritesShows?.length > 0 ? (
          favouritesShows?.map((elem) => (
            <div className="movie-card mt-2" key={elem.id}>
              <img
                className="card-img"
                src={`https://image.tmdb.org/t/p/original${elem.poster_path}`}
                alt="Movie poster"
              />
              <div className="details">
                <div className="title">
                  {elem.title ? elem.title : elem.name}
                </div>
                <div className="genres">
                  <img
                    src={elem.adult ? "./R18-rating.png" : "./PG.png"}
                    style={{ width: "35px" }}
                    alt=""
                  />
                </div>
                <div className="rating">
                  <StarRating rating={elem.vote_average} />
                </div>
                <NavLink
                  to={
                    elem.title === undefined
                      ? `/movies-app/series/${elem.id}`
                      : `/movies-app/movies/${elem.id}`
                  }
                  className="btn-card mt-2"
                >
                  More details
                </NavLink>
                <div className="addToFavourites-heart">
                  <button
                    onClick={() => dispatch(removeFromFavourites(elem.id))}
                    className="Btn"
                  >
                    <div className="sign">
                      <svg
                        viewBox="0 0 16 16"
                        className="bi bi-trash3-fill"
                        fill="currentColor"
                        height="18"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                      </svg>
                    </div>

                    <div className="text">Remove</div>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`display-4 ${!darkModeStatu ? "text-light" : null}`}
            style={{ height: "800px" }}
          >
            You don't have any favourites shows yet
          </div>
        )}
      </div>
    </>
  );
};
