import React from "react";
import { NavLink } from "react-router-dom";
// import { addToFavourites } from "../features/favourites/favouritesShowSlice";
// import { removeFromFavourites } from "../features/favourites/favouritesShowSlice";

export const TopRated = (props) => {
  return (
    <div className="flip-card">
      <img
        src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
        alt={(props.name ? props.name : props.title) + " poster"}
        draggable="false"
      />
      <p className="card-flip-text">
        {props.name ? props.name : props.title} {"(" + props.year + ")"}
      </p>

      <div className="img-btn">
        <NavLink
          to={
            props.title
              ? `/movies-app/movies/${props.id}`
              : `/movies-app/series/${props.id}`
          }
          title={props.title ? props.title : props.name}
        >
          <i className="fas fa-play-circle"></i>
        </NavLink>
      </div>
    </div>
  );
};
