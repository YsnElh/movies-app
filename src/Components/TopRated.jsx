import React from "react";
import { NavLink } from "react-router-dom";

export const TopRated = (props) => {
  //console.log(props.loading);
  return (
    <div>
      <div className="flip-card">
        <img
          src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
          alt={`Poster of the show ${
            props.name === undefined ? props.title : props.name
          }`}
          style={{ width: "150px" }}
        />
        <NavLink
          to={
            props.title !== undefined
              ? `/movies-app/movies/${props.id}`
              : `/movies-app/series/${props.id}`
          }
          className="img-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-play-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
          </svg>
        </NavLink>
      </div>
    </div>
  );
};
