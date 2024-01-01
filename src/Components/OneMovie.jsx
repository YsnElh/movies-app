import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieOne } from "../features/movies/movieOneSlice";
import { useParams } from "react-router-dom";
import StarRating from "./comps/StarRating";

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
  };
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}min`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h${remainingMinutes}min`;
    }
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
      {movie.loading && (
        <div className="display-4" style={{ textAlign: "center" }}>
          loading...
        </div>
      )}
      {!movie.loading && movie.error ? (
        <div className="display-4">Error : {movie.error}</div>
      ) : null}

      {!movie.loading && movie.error.length === 0 ? (
        <div>
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
                <p>
                  {formatDate(movie.movie.release_date) + " •"}
                  {movie.movie.genres === undefined
                    ? "n/a"
                    : movie.movie.genres.map((g) => (
                        <span key={g.id}> {g.name},</span>
                      ))}
                  {" • " + formatRuntime(movie.movie.runtime) + " • "}
                  {movie.movie.adult === true ? "+18" : "+13"}
                </p>
                <div>{movie.movie.tagline}</div>
                <p>{movie.movie.overview}</p>
                <p>
                  {movie.movie.original_language
                    ? "language: " + movie.movie.original_language + " "
                    : null}
                </p>
                <StarRating rating={movie.movie.vote_average} />
                <span>Votes Number: {movie.movie.vote_count}</span>
                <div>
                  <a className="menu__link" href={movie.movie.homepage}>
                    Movie HomePage
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
          <div>
            {/* 
              // OTHER CODE
            */}
          </div>
        </div>
      ) : null}
    </div>
  );
};
