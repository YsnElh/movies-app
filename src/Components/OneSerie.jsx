import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSerieOne } from "../features/series/serieOneSlice";
import { useParams } from "react-router-dom";
import StarRating from "./comps/StarRating";
import { fetchAllBackDropsSerie } from "../features/series/serieOneGetAllBackdrops";
import { addToFavourites } from "../features/favourites/favouritesShowSlice";
import { removeFromFavourites } from "../features/favourites/favouritesShowSlice";
import { fetchMovieCrew } from "../features/movies/getMovieCrewSlice";
import { ShowInfo } from "./ShowInfo";

export const OneSerie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);
  const darkModeStatu = useSelector((state) => state.darkMode.darkMode);
  let tvCrew = useSelector((state) =>
    state.movieCrew.movieCrew.cast?.slice(0, 10)
  );

  useEffect(() => {
    dispatch(fetchSerieOne(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchMovieCrew({ id, type: "tv" }));
  }, [dispatch, id]);

  //------------
  const serie = useSelector((state) => state.serie);
  let favouriteShows = useSelector(
    (state) => state.favouritesShow
  ).favouritesShow;
  //-------------
  useEffect(() => {
    dispatch(fetchAllBackDropsSerie(id));
  }, [dispatch, id]);

  let serieBackDrops = useSelector(
    (state) => state.serieAllBackdrops.allBackDropsSerie.backdrops
  );
  useEffect(() => {
    let intervalId;

    const updateBackdropIndex = () => {
      const newBackdropIndex = Math.floor(
        Math.random() * (serieBackDrops?.length || 0)
      );
      setCurrentBackdropIndex(newBackdropIndex);
    };
    updateBackdropIndex();
    // intervalId = setInterval(() => {
    //   updateBackdropIndex();
    // }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [serieBackDrops]);
  let serieBackDrop = serieBackDrops?.[currentBackdropIndex]?.file_path;
  //-------------
  const styleComp = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${serieBackDrop})`,
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };
  //-----------------------------------------------------------------
  function checkIsFavs(serie) {
    if (!Array.isArray(favouriteShows)) {
      console.error("favouriteShows is not an array");
      return;
    }

    const isFavourite = favouriteShows.some(
      (show) =>
        show.id === serie.id &&
        show.title === serie.name &&
        show.show_type === "serie"
    );
    return { ...serie, ischecked: isFavourite };
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

  let OneSerie = checkIsFavs(serie.serie);
  //-----------------------------------------------------------------
  useEffect(() => {
    document.title = OneSerie.name ? OneSerie.name : "Movies App";

    // Cleanup function
    return () => {
      document.title = "Movies App";
    };
  }, [OneSerie.name]);
  return (
    <div>
      {serie.loading && (
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
      {!serie.loading && serie.error ? (
        <div className={`display-4 ${!darkModeStatu ? "text-light" : null}`}>
          Error : {serie.error}
        </div>
      ) : null}
      {!serie.loading && serie.error === "" ? (
        <div>
          <div className="movie-info" style={styleComp}>
            <div className="one-movies-header">
              <div className="image-card">
                <img
                  title={OneSerie.name}
                  style={{ cursor: "pointer" }}
                  src={
                    OneSerie.poster_path
                      ? `https://image.tmdb.org/t/p/original${OneSerie.poster_path}`
                      : "/movies-app/poster-not-found.jpg"
                  }
                  alt={`${OneSerie.name} poster`}
                />
              </div>
              <div className="info-movieOne">
                <h1>{OneSerie.name}</h1>
                <p>
                  {formatDate(OneSerie.first_air_date) + " •"}
                  {OneSerie.genres && OneSerie.genres.length > 0
                    ? OneSerie.genres.map((g, index) => (
                        <span key={g.id}>
                          {g.name}
                          {index < OneSerie.genres.length - 1 && ","}{" "}
                        </span>
                      ))
                    : null}
                </p>
                <p>{OneSerie.overview}</p>
                <i>
                  {OneSerie.tagline && OneSerie.tagline.length > 0
                    ? OneSerie.tagline
                    : null}
                </i>

                <p>
                  {OneSerie.number_of_seasons && OneSerie.number_of_episodes
                    ? OneSerie.number_of_seasons +
                      " seasons / " +
                      OneSerie.number_of_episodes +
                      " episodes"
                    : null}
                </p>
                <StarRating
                  rating={
                    OneSerie.vote_average
                      ? OneSerie.vote_average?.toFixed(1)
                      : 0
                  }
                />
                <div>
                  <img
                    src="/movies-app/tmdb-logo.png"
                    alt="tmdb logo"
                    style={{
                      width: "50px",
                      border: "none",
                      margin: "0 0 20px 0",
                    }}
                  />
                </div>
                <span>
                  Votes Number:{" "}
                  {OneSerie.vote_count ? OneSerie.vote_count : null}
                </span>
                <div className="addToFavourites-heart">
                  <div className="con-like">
                    <input
                      onChange={(e) =>
                        handleCheckboxChange(e.target.checked, OneSerie)
                      }
                      className="like"
                      type="checkbox"
                      title="Add to Favourites"
                      checked={OneSerie.ischecked}
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
                <div>
                  {OneSerie.homepage ? (
                    <a className="menu__link" href={OneSerie.homepage}>
                      Serie HomePage
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-caret-right-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                      </svg>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {tvCrew && OneSerie ? (
            <ShowInfo casts={tvCrew} show={OneSerie} type={"tv"} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
