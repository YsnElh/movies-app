import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieOne } from "../features/movies/movieOneSlice";
import { useParams } from "react-router-dom";

export const OneMovie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //console.log(id);
  useEffect(() => {
    dispatch(fetchMovieOne(id));
  }, [dispatch, id]);
  const movie = useSelector((state) => state.movie);

  //----------------------

  //--------------
  const styleComp = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.movie.backdrop_path})`,
    backgroundRepeat: "noRepeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    animation: "background-flow 40s linear infinite",
    color: "#dddddd",
  };
  return (
    <div>
      {movie.loading && (
        <div className="display-4" style={{ textAlign: "center" }}>
          loading...
        </div>
      )}
      {!movie.loading && movie.error ? (
        <div className="display-4">Error : {movie.error}</div>
      ) : null}

      {!movie.loading && movie.error.length === 0 ? (
        <div className="movie-info" style={styleComp}>
          <div className="one-movies-header">
            <div>
              <img
                title={movie.movie.title}
                src={`https://image.tmdb.org/t/p/original/${movie.movie.poster_path}`}
                alt="movie.Movie poster"
              />
            </div>
            <div className="info-movieOne">
              <h1>{movie.movie.title}</h1>
              <ul>
                {movie.movie.genres === undefined
                  ? "n/a"
                  : movie.movie.genres.map((g) => <li key={g.id}>{g.name}</li>)}
                <div className="movie-rate">
                  <p>Rate: {movie.movie.adult === true ? "+17" : "+13"}</p>
                </div>
              </ul>
            </div>
          </div>

          <p>Released: {movie.movie.release_date}</p>

          <p>Description: {movie.movie.overview}</p>
          <p>Time: {movie.movie.runtime}min </p>
          <p>
            {movie.movie.original_language === undefined
              ? null
              : "language: " + movie.movie.original_language}
          </p>
          <p>Status: {movie.movie.status} </p>
          <p>Popularity : {movie.movie.popularity} </p>

          <p>
            Vote:{" "}
            {movie.movie.vote_average === 0
              ? "Not Available"
              : movie.movie.vote_average}{" "}
          </p>

          <a
            href={movie.movie.homepage}
            className="btn btn-dark mt-1"
            style={{ width: "125px" }}
          >
            Homepage{" "}
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
