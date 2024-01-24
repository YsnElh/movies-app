import React from "react";
import { NavLink } from "react-router-dom";
// import { addToFavourites } from "../features/favourites/favouritesShowSlice";
// import { removeFromFavourites } from "../features/favourites/favouritesShowSlice";

export const TopRated = (props) => {
  //console.log(props.loading);
  return (
    <div className="flip-card">
      <img
        src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
        alt={`Poster of the show: ${props.name ? props.name : props.title}`}
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
        {/* <div
          title="Add to favourites"
          className="addToFavourites-heart add-favs-flip-card"
        >
          <div className="con-like">
            <input
              // onChange={(e) => handleCheckboxChange(e.target.checked, elem)}
              className="like"
              type="checkbox"
              title="like"
              checked={props.ischecked}
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
                <polygon className="poly" points="10,10 20,20"></polygon>
                <polygon className="poly" points="10,50 20,50"></polygon>
                <polygon className="poly" points="20,80 30,70"></polygon>
                <polygon className="poly" points="90,10 80,20"></polygon>
                <polygon className="poly" points="90,50 80,50"></polygon>
                <polygon className="poly" points="80,80 70,70"></polygon>
              </svg>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
