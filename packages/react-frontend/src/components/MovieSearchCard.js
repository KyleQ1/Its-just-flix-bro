import React from 'react';
import "./MovieSearchCard.css";
import { Link } from "react-router-dom";

function MovieSearchCard({ id, image, title }) {
  return (
    <Link to={`/movies/${id}`} style={{ textDecoration: "none" }}>
      <div className="movie_search_card">
        <div className="movie_search_items">
        <img loading="lazy" 
          src={image} 
          alt={title} 
          className="movie_search_card_image"
        />
        <h3 className="movie_search_card_text">{title}</h3>
        </div>
      </div>
    </Link>
  )
}

export default MovieSearchCard