import React from "react";
import Ratings from "./Ratings";
import userLogo from "../assets/account-icon.png";
import { useParams } from "react-router-dom";
import "./Review.css";

function Review(props) {
  let { id } = useParams();

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
    const promise = fetch(`http://localhost:8000/movie/id/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
    });
    return promise;
  }

  return (
    <div id="review-landing">
      <div id="review-header">
        <img id="user-icon" src={userLogo} alt="User Icon" />
        <h1>{props.title}</h1>
      </div>
      <Ratings />
      <textarea id="text" placeholder="Write review"></textarea>
      <div id="review-button">
        <button onClick={() => props.setSubmitted(true)}>Submit</button>
      </div>
    </div>
  );
}

export default Review;
