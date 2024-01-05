import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesPop } from "../features/movies/moviesPopularSlice";
import { fetchTopRatedMovies } from "../features/movies/topRatedMoviesSlice";
import { fetchTopRatedSeries } from "../features/series/topRatedSeriesSlice";
import { fetchAllBackDropsMovie } from "../features/movies/movieOneGetAllBackdrops";
import { TopRated } from "./TopRated";
import { NavLink } from "react-router-dom";

export const HomePage = () => {
  const dispatch = useDispatch();
  const moviesPopular = useSelector((state) => state.moviesPopular);
  const movieBackDrops = useSelector((state) => state.movieAllBackdrops.movie);
  const darkModeStatu = useSelector((state) => state.darkMode.darkMode);

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);
  const [moviePoster, setMoviePoster] = useState(false);

  useEffect(() => {
    if (movieBackDrops?.backdrops?.length > 0) {
      const maxIndex = Math.min(10, movieBackDrops.backdrops.length);
      const randomIndex = Math.floor(Math.random() * maxIndex);
      setCurrentBackdropIndex(randomIndex);
    }
  }, [movieBackDrops]);

  useEffect(() => {
    setMoviePoster(movieBackDrops?.backdrops[currentBackdropIndex]?.file_path);
  }, [currentBackdropIndex, movieBackDrops]);

  useEffect(() => {
    dispatch(fetchMoviesPop());
  }, [dispatch]);

  useEffect(() => {
    if (moviesPopular.moviesPopular.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * Math.min(8, moviesPopular.moviesPopular.length)
      );
      setMovie(moviesPopular.moviesPopular[randomIndex]);
      setCurrentBackdropIndex(0); // Reset backdrop index when a new movie is set
    }

    setLoading(moviesPopular.loading);
    setError(moviesPopular.error);

    const intervalId = setInterval(() => {
      if (moviesPopular.moviesPopular.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * Math.min(8, moviesPopular.moviesPopular.length)
        );
        setIsTransitioning(true);
        setTimeout(() => {
          setMovie(moviesPopular.moviesPopular[randomIndex]);
          setCurrentBackdropIndex(0); // Reset backdrop index when a new movie is set
          setIsTransitioning(false);
        }, 500);
      }
    }, 15000);

    return () => clearInterval(intervalId);
  }, [moviesPopular]);

  useEffect(() => {
    if (movie.id) {
      dispatch(fetchAllBackDropsMovie(movie.id));
    }
  }, [dispatch, movie.id]);

  //---------fetch TOp rated movies ----------------
  let [topRatedMovies] = useState([]);
  let [topRated_Loading] = useState(false);
  let [topRated_Error] = useState("");

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);
  const topRatedMoviesS = useSelector((state) => state.topRatedMovies);
  //console.log(topRatedMoviesS.topRatedMovies[0]);

  topRatedMovies = topRatedMoviesS.topRatedMovies;
  topRated_Loading = topRatedMoviesS.loading;
  topRated_Error = topRatedMoviesS.error;
  //---------fetch TOp rated series ----------------
  let [topRatedSeries] = useState([]);
  let [topRatedS_Loading] = useState(false);
  let [topRatedS_Error] = useState("");

  useEffect(() => {
    dispatch(fetchTopRatedSeries());
  }, [dispatch]);
  const topRatedSeriesS = useSelector((state) => state.topRatedSeries);
  //console.log(topRatedSeriesS.topRatedSeries[0]);
  topRatedSeries = topRatedSeriesS.topRatedSeries;
  topRated_Loading = topRatedSeriesS.loading;
  topRated_Error = topRatedSeriesS.error;

  //FOR THE TOP RATED (MOVIES)
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  /* ------------------------------------------ */
  //FOR THE TOP RATED (SERIES)
  let containerRefS = useRef(null);
  let [isDraggingS, setIsDraggingS] = useState(false);
  let [startXS, setStartXS] = useState(0);
  let [scrollLeftS, setScrollLeftS] = useState(0);

  let handleMouseDownS = (e) => {
    setIsDraggingS(true);
    setStartXS(e.pageX - containerRefS.current.offsetLeft);
    setScrollLeftS(containerRefS.current.scrollLeft);
  };

  let handleMouseMoveS = (e) => {
    if (!isDraggingS) return;
    let x = e.pageX - containerRefS.current.offsetLeft;
    let walk = (x - startXS) * 1.5;
    containerRefS.current.scrollLeft = scrollLeftS - walk;
  };

  let handleMouseUpS = () => {
    setIsDraggingS(false);
  };
  return (
    <div className="homepage-container">
      {loading && (
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
      {!loading && !error ? (
        <div
          className={`home-movie-pop ${isTransitioning ? "transitioning" : ""}`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${moviePoster})`,
          }}
        >
          <img
            className="image-card"
            title={"poster of the movie: " + movie?.title}
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt={`Poster of the movie ${movie?.title}`}
          />
          <div className="home-movie-pop-text">
            <h1 className="display-1">{movie?.title}</h1>
            <p className="display-6">{movie?.overview}</p>
            <NavLink
              to={`/movies-app/movies/${movie?.id}`}
              className="btn-homepage"
            >
              View details
            </NavLink>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div
        style={{ background: "#000", color: "#fff" }}
        className="top-rated-pad"
      >
        <div className="top-rated-movies-tite">
          <div className="display-6">Top Rated Movies</div>
          <button className="btn-see-more-homepage">
            <NavLink
              to={`/movies-app/movies`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Explore more Movies
            </NavLink>
          </button>
        </div>

        <div
          ref={containerRef}
          className="top-rated-movies-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {topRatedMovies?.map((m) => (
            <TopRated
              key={m.id}
              id={m.id}
              poster_path={m.poster_path}
              title={m.title}
              loading={topRated_Loading}
              error={topRated_Error}
            />
          ))}
        </div>
      </div>
      {/* SERIES */}
      <div
        style={{ background: "#000", color: "#fff" }}
        className="top-rated-pad"
      >
        <div className="top-rated-movies-tite">
          <div className="display-6">Top Rated Series</div>
          <button className="btn-see-more-homepage">
            <NavLink
              to={`/movies-app/series`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Explore more Series
            </NavLink>
          </button>
        </div>

        <div
          ref={containerRefS}
          className="top-rated-movies-container"
          onMouseDown={handleMouseDownS}
          onMouseMove={handleMouseMoveS}
          onMouseUp={handleMouseUpS}
          onMouseLeave={handleMouseUpS}
        >
          {topRatedSeries?.map((m) => (
            <TopRated
              key={m.id}
              id={m.id}
              poster_path={m.poster_path}
              title={m.title}
              loading={topRatedS_Loading}
              error={topRatedS_Error}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
