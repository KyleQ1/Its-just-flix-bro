import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({ title, image, id }) {
  return (
    <div className="movie-card">
      <div className="movie-image">
        <Link to={`/movies/${id}`}>
          <img src={image} alt={title} />
        </Link>
      </div>
    </div>
  );
}
