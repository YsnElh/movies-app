import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourites } from "../features/favourites/favouritesShowSlice";
import { destroyFavourites } from "../features/favourites/favouritesShowSlice";
import { NavLink } from "react-router-dom";

export const FavouritesShows = () => {
  const dispatch = useDispatch();
  const favouritesShows = useSelector(
    (state) => state.favouritesShow.favouritesShow
  );

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
                src={`https://image.tmdb.org/t/p/original${elem.poster_path}`}
                alt="Movie poster"
              />
              <div className="details">
                <div className="title">
                  {elem.media_type === "movie" ? elem.title : elem.name}
                </div>
                <div className="rating">
                  Rating: {elem.vote_average !== 0 ? elem.vote_average : "n/a"}
                </div>
                {/* <div className="genres">
              {elem.release_date !== undefined
                ? "Year: " + elem.release_date.slice(0, 4)
                : null}
            </div> */}
                <NavLink
                  to={
                    elem.title === undefined
                      ? `/series/${elem.id}`
                      : `/movies/${elem.id}`
                  }
                  className="button"
                >
                  More details
                </NavLink>
                <div className="addToFavourites-heart">
                  <i
                    style={{ color: "red" }}
                    className="fa-solid fa-heart heart"
                    onClick={() => dispatch(removeFromFavourites(elem.id))}
                    title="Remove from favourites"
                  ></i>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="display-4" style={{ height: "800px" }}>
            You don't have any favourites shows yet
          </div>
        )}
      </div>
    </>
  );
};
