import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesPop } from "../features/movies/moviesPopularSlice";
import { fetchTopRatedMovies } from "../features/movies/topRatedMoviesSlice";
import { fetchTopRatedSeries } from "../features/series/topRatedSeriesSlice";
import { TopRated } from "./TopRated";
import { NavLink } from "react-router-dom";
import { LoadingOverlay } from "./LoadingOverlay";
import { Slider } from "./Slider";

export const HomePage = () => {
  const dispatch = useDispatch();
  const moviesPopular = useSelector((state) => state.moviesPopular);
  let favouriteShows = useSelector(
    (state) => state.favouritesShow
  ).favouritesShow;

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let [topRatedMovies, setTopRatedMovies] = useState([]);
  let [topRatedM_Loading, setTopRatedM_Loading] = useState(false);
  let [topRatedM_Error, setTopRatedM_Error] = useState("");

  let [topRatedSeries, setTopRatedSeries] = useState([]);
  let [topRatedS_Loading, setTopRatedS_Loading] = useState(false);
  let [topRatedS_Error, setTopRatedS_Error] = useState("");

  useEffect(() => {
    dispatch(fetchMoviesPop());
  }, [dispatch]);

  useEffect(() => {
    setMovie(moviesPopular.moviesPopular.slice(0, 8));
    setLoading(moviesPopular.loading);
    setError(moviesPopular.error);
  }, [moviesPopular]);

  //---------fetch TOp rated movies ----------------

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);
  const topRatedMoviesS = useSelector((state) => state.topRatedMovies);

  const checkIsFavs = useCallback(
    (shows, type) => {
      if (!Array.isArray(favouriteShows)) {
        console.error("favouriteShows is not an array");
        return;
      }
      const updatedMovies = shows.map((movie) => {
        const isFavourite = favouriteShows.some(
          (show) => show.id === movie.id && show.show_type === type
        );
        return { ...movie, ischecked: isFavourite };
      });
      return updatedMovies;
    },
    [favouriteShows]
  );

  useEffect(() => {
    setTopRatedMovies(checkIsFavs(topRatedMoviesS.topRatedMovies, "movie"));
    setTopRatedM_Loading(topRatedMoviesS.loading);
    setTopRatedM_Error(topRatedMoviesS.error);
  }, [topRatedMoviesS, checkIsFavs]);

  //---------fetch TOp rated series ----------------

  useEffect(() => {
    dispatch(fetchTopRatedSeries());
  }, [dispatch]);
  const topRatedSeriesS = useSelector((state) => state.topRatedSeries);

  useEffect(() => {
    setTopRatedS_Loading(topRatedSeriesS.loading);
  }, [topRatedSeriesS]);

  useEffect(() => {
    setTopRatedSeries(checkIsFavs(topRatedSeriesS.topRatedSeries, "serie"));
    setTopRatedS_Loading(topRatedSeriesS.loading);
    setTopRatedS_Error(topRatedSeriesS.loading);
  }, [topRatedSeriesS, checkIsFavs]);

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
      {loading || topRatedS_Loading || topRatedM_Loading ? (
        <LoadingOverlay />
      ) : null}

      {!loading && !error ? <Slider slides={movie} /> : null}

      <div className="top-rated-pad">
        <div className="top-rated-movies-tite">
          <div className="display-6">Top Rated Movies</div>
          <NavLink
            className="link-top-rated-more"
            to={`/movies-app/movies`}
            style={{ color: "white", textDecoration: "none" }}
          >
            Explore more Movies <i className="fas fa-caret-right"></i>
          </NavLink>
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
              ischecked={m.ischecked}
              year={m.release_date.slice(0, 4)}
              loading={topRatedM_Loading}
              error={topRatedM_Error}
            />
          ))}
        </div>
      </div>

      {/* SERIES */}
      <div className="top-rated-pad">
        <div className="top-rated-movies-tite">
          <div className="display-6">Top Rated Series</div>
          <NavLink
            className="link-top-rated-more"
            to={`/movies-app/series`}
            style={{ color: "white", textDecoration: "none" }}
          >
            Explore more Series <i className="fas fa-caret-right"></i>
          </NavLink>
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
              name={m.name}
              year={m.first_air_date.slice(0, 4)}
              ischecked={m.ischecked}
              loading={topRatedS_Loading}
              error={topRatedS_Error}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
