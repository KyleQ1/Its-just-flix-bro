import React from "react";
import movie from "./assets/netflix-logo.png";
import accountIcon from "./assets/account-icon.png";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

function MovieList(props) {
  let genre = props.genre;
  return (
    <div>
      <div id="movie-genre">
        <Link to={"/movie"}>
          <h1>{genre}</h1>
        </Link>
      </div>
      <div id="movie-list">
        <MovieCard title="Blazing Saddles" image={movie} id="testid" />
        <MovieCard title="Blazing Saddles 2" image={accountIcon} id="testid" />
      </div>
    </div>
  );
}

export default MovieList;
