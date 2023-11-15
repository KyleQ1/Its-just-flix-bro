import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({ title, image, id }) {
  return (
    <div className="movie-card">
      <Link to={`/movies/${id}`}>
        <img src={image} alt={title} className="movie-image" />
      </Link>
    </div>
  );
}
