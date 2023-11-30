import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "./MovieReviewPage.css";

function MovieReviewPage(props) {
  let { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    function fetchMovie() {
      const promise = fetch(`http://localhost:8000/movie/id/${id}`);
      return promise;
    }

    fetchMovie()
      .then((res) => {
        if (res.status === 404 || res.status === 500) {
          throw new Error(`GET failed, status code ${res.status}`);
        } else {
          return res.json();
        }
      })
      .then((json) => {
        setMovie(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div id="landing">
      <div id="movie-background">
        <Header />
        <img src={movie.image} alt={movie.title} />
        <h2>{movie.title}</h2>
      </div>
      <div id="review-body">
        <div id="movie-info">
          <div id="genre">{movie.genre && movie.genre.join(", ")}</div>
          <div id="description">{movie.description}</div>
          <div id="release">{movie.releaseDate}</div>
        </div>
        <div id="movie-reviews">
          <h1>Review</h1>
          <button>Submit Review</button>
        </div>
      </div>
    </div>
  );
}

export default MovieReviewPage;
