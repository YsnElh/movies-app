import React from "react";
import "./StarRating.css";

const StarRating = ({ rating }) => {
  const stars = Math.round(rating / 2);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={index < stars ? "star-filled" : "star-empty"}
        ></div>
      ))}
      <span className="rating-label">{rating}</span>
    </div>
  );
};

export default StarRating;
