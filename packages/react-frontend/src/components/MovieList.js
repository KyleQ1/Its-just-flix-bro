import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

function MovieList(props) {
  const effectRan = React.useRef(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (effectRan.current) return;
    function fetchMovies() {
      const promise = fetch(`http://localhost:8000/movie/genre/${props.genre}`);
      return promise;
    }

    fetchMovies()
      .then((res) => {
        if (res.status === 404 || res.status === 500) {
          throw new Error(`GET failed, status code ${res.status}`);
        } else {
          return res.json();
        }
      })
      .then((json) => {
        const randomSet = getRandomSubset(json, 35);
        setMovies(randomSet);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => 
      (effectRan.current = true);
  }, [props.genre]);

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
