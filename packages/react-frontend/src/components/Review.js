import React from "react";
import Ratings from "./Ratings";
import userLogo from "../assets/account-icon.png";
import "./Review.css";

function Review(props) {
  const [reviewData, setReviewData] = React.useState({
    title: "",
    text: "",
    rating: 3,
  });
  const [rating, setRating] = React.useState(3);

  function postReview(review) {
    const promise = fetch(`http://localhost:8000/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    return promise;
  }

  function handleSubmit(e) {
    e.preventDefault();
    postReview({
      movieId: props.movieId,
      userId: props.userId,
      reviewText: reviewData.text,
      reviewTitle: reviewData.title,
      rating: reviewData.rating,
    })
      .then((res) => {
        if (res.status === 201) return res.json();
        else throw new Error(`${res.status}`);
      })
      .then((json) => {
        if (json) props.setter([...props.getter, json]);
      })
      .catch((error) => {
        console.log(error);
      });
    props.setSubmitted(true);
  }

  return (
    <div id="review-landing">
      <div id="review-header">
        <img id="user-icon" src={userLogo} alt="User Icon" />
      </div>
      <Ratings setRating={setRating} />
      <form onSubmit={handleSubmit}>
        <h3>{props.title}</h3>
        <div id="review-text">
          <textarea
            style={{ width: "50vw", height: "20vh" }}
            placeholder="review text"
            onChange={(e) =>
              setReviewData({
                ...reviewData,
                title: props.title,
                text: e.target.value,
                rating: rating,
              })
            }
          />
          <button style={{ height: "5vh" }} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Review;
