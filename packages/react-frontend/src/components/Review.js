import React from "react";
import Ratings from "./Ratings";
import userLogo from "../assets/account-icon.png";
import { Form, useParams } from "react-router-dom";
import "./Review.css";

function Review(props) {

  const [reviewData, setReviewData] = React.useState({title: "", text: "", rating: 3});

  function updateReview(review) {
    postReview(review)
      .then((res) => res.status === 201 ? res.json() : undefined)
      .then((json) => {
        if (json); /*add review to database*/
      })
      .catch((error) => {
        console.log(error);
      })

  }

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

  function handleSubmit() {
    postReview(
      { 
        movieId: props.movieId,
        userId: props.userId,
        reviewText: reviewData.text,
        reviewTitle: reviewData.title,
        rating: props.rating
      })
        .then((res) => res.status === 201 ? res.json() : undefined)
        .then((json) => {
          if (json) props.setter(...props.getter, json);
        })
        .catch((error) => {
          console.log(error);
        })
  }

  return (
    <div id="review-landing">
      <div id="review-header">
        <img id="user-icon" src={userLogo} alt="User Icon" />
      </div>
      <Ratings />
      <form onSubmit={handleSubmit}>
        <h3>Title</h3>
        <input 
          type="title" 
          placeholder="review title"
          onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}/>
        <input 
          type="text" 
          placeholder="review text"
          onChange={(e) => setReviewData({ ...reviewData, text: e.target.value })}/>
        <button type="submit">Submit</button>
          </form>
      {/* <textarea id="text" placeholder="Write review"></textarea>
      <div id="review-button">
        <button onClick={() => props.setSubmitted(true)}>Submit</button>
      </div> */}
    </div>
  );
}

export default Review;
