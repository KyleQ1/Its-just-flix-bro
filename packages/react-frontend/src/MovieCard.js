import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({ title, image, genres, id }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="movie-image">
        <Link to={`/movies/${id}`}>
          <img src={image} alt={title} />
        </Link>
      </div>
      {isHovered && (
        <div className="movie-title">
          <Link to={`/movies/${id}`} style={{ color: `white` }}>
            {title}
          </Link>
          <p>{genres.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
