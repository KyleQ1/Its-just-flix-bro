import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import UserReview from "../components/UserReview";
import "./MovieReviewPage.css";

function MovieReviewPage(props) {
  let { id } = useParams();
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    function fetchMovie() {
      const promise = fetch(`http://localhost:8000/movie/id/${id}`);
      return promise;
    }

    function fetchReview(reviewId) {
      const promise = fetch(`http://localhost:8000/review/${reviewId}`);
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
        return json.reviews;
      })
      .then((reviews) => {
        const fetchReviewPromises = reviews.map((review) => {
          return fetchReview(review._id.toString())
            .then((res) => {
              if (res.status === 404 || res.status === 500) {
                throw new Error(`GET failed, status code ${res.status}`);
              } else {
                return res.json();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
        return Promise.all(fetchReviewPromises);
      })
      .then((fetchedReviews) => {
        setReviews(fetchedReviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(reviews);
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
      <div className="movie-reviews">
        {reviews.map((review) => (
          <UserReview
            title={review.reviewTitle}
            text={review.reviewText}
            rating={review.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieReviewPage;
