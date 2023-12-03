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
    <div className="movie-page">
      <Header />
      <div className="moviepage-background">
        <img src={movie.image} alt={movie.title} className="moviepage-image" />
      </div>
      <div className="moviepage-details">
        <div className="moviepage-title">{movie.title}</div>
        <div className="moviepage-genre">
          {movie.genres && movie.genres.join(", ")}
        </div>
        <div className="moviepage-description">{movie.description}</div>
        <div className="moviepage-release">{movie.releaseDate}</div>
      </div>
      <div className="movie-reviews"></div>
    </div>
  );
}

export default MovieReviewPage;
