import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSerieOne } from "../features/series/serieOneSlice";
import { useParams } from "react-router-dom";
import StarRating from "./comps/StarRating";

export const OneSerie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSerieOne(id));
  }, [dispatch, id]);

  //------------
  const serie = useSelector((state) => state.serie);
  //-------------
  const styleComp = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${serie.serie.backdrop_path})`,
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <div>
      {serie.loading && (
        <div className="display-4" style={{ textAlign: "center" }}>
          loading...
        </div>
      )}
      {!serie.loading && serie.error ? (
        <div className="display-4">Error : {serie.error}</div>
      ) : null}
      {!serie.loading && serie.error === "" ? (
        <div className="movie-info" style={styleComp}>
          <div className="one-movies-header">
            <div>
              <img
                title={serie.serie.name}
                style={{ cursor: "pointer" }}
                src={`https://image.tmdb.org/t/p/original${serie.serie.poster_path}`}
                alt={`${serie.serie.name} poster`}
              />
            </div>
            <div className="info-movieOne">
              <h1>{serie.serie.name}</h1>
              <p>
                {formatDate(serie.serie.first_air_date) + " •"}
                {serie.serie.genres && serie.serie.genres.length > 0
                  ? serie.serie.genres.map((g) => (
                      <span key={g.id}> {g.name}, </span>
                    ))
                  : null}
                {" • " + serie.serie.adult === true ? "+18" : "+13"}
              </p>
              <p>{serie.serie.overview}</p>
              <div>
                {serie.serie.tagline && serie.serie.tagline.length > 0
                  ? serie.serie.tagline
                  : null}
              </div>
              <p>
                {serie.serie.original_language
                  ? "language: " + serie.serie.original_language + " "
                  : null}
              </p>
              <p>
                {serie.serie.number_of_seasons && serie.serie.number_of_episodes
                  ? serie.serie.number_of_seasons +
                    " seasons / " +
                    serie.serie.number_of_episodes +
                    " episodes"
                  : null}
              </p>
              <StarRating
                rating={serie.serie.vote_average ? serie.serie.vote_average : 0}
              />
              <span>
                Votes Number:{" "}
                {serie.serie.vote_count ? serie.serie.vote_count : null}
              </span>
              <div>
                <a className="menu__link" href={serie.serie.homepage}>
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
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
