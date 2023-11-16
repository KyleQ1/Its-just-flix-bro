import React from "react";
import movie from "./assets/netflix-logo.png";
import accountIcon from "./assets/account-icon.png";
import MovieCard from "./MovieCard";

function MovieList(props) {
  let genre = props.genre;
  return (
    <div>
      <div id="movie-genre">
        <h1 id="genre">{genre}</h1>
      </div>
      <div id="movie-list">
        <MovieCard title="Blazing Saddles" image={movie} id="testid" />
        <MovieCard title="Blazing Saddles 2" image={accountIcon} id="testid" />
      </div>
    </div>
  );
}

export default MovieList;
