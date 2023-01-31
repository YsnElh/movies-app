import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSerieOne } from "../features/series/serieOneSlice";
import { useParams } from "react-router-dom";

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
    backgroundRepeat: "noRepeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    animation: "background-flow 40s linear infinite",
    color: "#cacaca",
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
                alt="serie poster"
              />
            </div>
            <div className="info-movieOne">
              <h1>{serie.serie.name}</h1>
              <ul>
                {serie.serie.genres === undefined
                  ? null
                  : serie.serie.genres.map((g) => <li key={g.id}>{g.name}</li>)}
              </ul>
            </div>
          </div>

          <p>First EP release: {serie.serie.first_air_date}</p>

          <p>
            Description:{" "}
            {serie.serie.overview === ""
              ? "Not Available"
              : serie.serie.overview}
          </p>
          <p>
            {serie.serie.original_language !== undefined
              ? "Luanguage: " + serie.serie.original_language
              : "Not Available"}
          </p>
          {/* <p>Rate: {serie.serie.adult === true ? "+17" : "+13"}</p> */}
          <p>Status: {serie.serie.status} </p>
          <p>
            Number of saisons:
            {serie.serie.number_of_seasons > 0
              ? " " + serie.serie.number_of_seasons
              : "not available"}
          </p>
          <p>
            Number of episodes:
            {serie.serie.number_of_episodes > 0
              ? " " + serie.serie.number_of_episodes
              : "not available"}
          </p>
          <p>Popularity : {serie.serie.popularity} </p>
          <p>Vote: {serie.serie.vote_average} </p>
          <a
            href={serie.serie.homepage}
            className="btn btn-dark"
            style={{ width: "125px" }}
          >
            Homepage
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
      ) : null}
    </div>
  );
};
