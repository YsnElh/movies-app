import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export const Slider = (props) => {
  const [movies, setMovies] = useState([]);
  const imgSrcTMDB = "https://image.tmdb.org/t/p/original";
  const backgroundImgNotfound = "/movies-app/bg-not-found.jpg";

  useEffect(() => {
    const combined = [...props.movies, ...props.series];
    const shuffledArray = combined.sort(() => Math.random() - 0.5);
    setMovies(shuffledArray);
  }, [props.movies, props.series]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxCharacters, setMaxCharacters] = useState(435);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setMaxCharacters(200);
      } else {
        setMaxCharacters(435);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % movies.length);
  }, [movies]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? movies.length - 1 : prevSlide - 1
    );
  }, [movies]);

  const renderText = (text) => {
    if (text && text.length > maxCharacters) {
      const truncatedText = text.substring(0, maxCharacters);
      return truncatedText + "... ";
    } else {
      return text;
    }
  };

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 15000);
    return () => clearInterval(intervalId);
  }, [nextSlide, prevSlide, currentSlide]);

  return (
    //movies-app/bg-not-found.jpg
    <>
      {movies.length > 0 ? (
        <div
          className="home-movie-pop"
          style={{
            backgroundImage: `url(${
              movies[currentSlide].backdrop_path
                ? imgSrcTMDB + movies[currentSlide].backdrop_path
                : backgroundImgNotfound
            })`,
          }}
        >
          <span
            className="btn-sildeshow btn-sildeshow-prev"
            onClick={() => prevSlide()}
          >
            <i
              className="fas fa-angle-left"
              style={{ zIndex: "90" }}
              data-tooltip-id={currentSlide + 1}
              data-tooltip-content={
                movies[currentSlide > 0 ? currentSlide - 1 : 9].title
                  ? movies[currentSlide > 0 ? currentSlide - 1 : 9].title
                  : movies[currentSlide > 0 ? currentSlide - 1 : 9].name
              }
            >
              <Tooltip id={currentSlide + 1} />
            </i>
          </span>
          <img
            className="image-card"
            title={
              (movies[currentSlide].title
                ? movies[currentSlide].title
                : movies[currentSlide].name) + " movie poster"
            }
            src={`https://image.tmdb.org/t/p/original${movies[currentSlide].poster_path}`}
            alt={
              (movies[currentSlide].title
                ? movies[currentSlide].title
                : movies[currentSlide].name) + " movie poster"
            }
          />
          <div className="home-movie-pop-text">
            <div className="d-flex flex-row justify-content-start align-items-baseline">
              <h1 className="display-1">
                {movies[currentSlide].title
                  ? movies[currentSlide].title
                  : movies[currentSlide].name}
              </h1>
            </div>

            <p className="display-6">
              {renderText(movies[currentSlide].overview)}
            </p>
            <NavLink
              to={`/movies-app/${
                movies[currentSlide].title ? "movies" : "series"
              }/${movies[currentSlide].id}`}
              className="btn-homepage"
            >
              View details
            </NavLink>
          </div>
          <span
            className="btn-sildeshow btn-sildeshow-next"
            onClick={nextSlide}
          >
            <i
              className="fas fa-chevron-right"
              data-tooltip-id={currentSlide + 1}
              data-tooltip-content={
                movies[currentSlide < 9 ? currentSlide + 1 : 0].title
                  ? movies[currentSlide < 9 ? currentSlide + 1 : 0].title
                  : movies[currentSlide < 9 ? currentSlide + 1 : 0].name
              }
            >
              <Tooltip id={currentSlide + 1} />
            </i>
          </span>
          <div className="navigation-indicators">
            {movies.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => handleIndicatorClick(index)}
                data-tooltip-id={index + 1}
                data-tooltip-content={
                  movies[index].title ? movies[index].title : movies[index].name
                }
              >
                {currentSlide === index ? null : <Tooltip id={index + 1} />}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
