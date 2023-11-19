import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

function MovieList(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies()
      .then((res) => {
        if (res.status === 404 || res.status === 500) {
          throw new Error(`GET failed, status code ${res.status}`);
        } else {
          return res.json();
        }
      })
      .then((json) => {
        const randomSet = getRandomSubset(json, 8);
        setMovies(randomSet);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function fetchMovies() {
    const promise = fetch(`http://localhost:8000/movie/genre/${props.genre}`);
    return promise;
  }

  function getRandomSubset(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  return (
    <div>
      <div id="movie-genre">
        <Link to={"/movie"}>
          <h1>{props.genre}</h1>
        </Link>
      </div>
      <div id="movie-list">
        <Carousel movies={movies} />
      </div>
    </div>
  );
}

export default MovieList;
