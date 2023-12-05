import React from "react";
import Ratings from "./Ratings";
import userLogo from "../assets/account-icon.png";
import "./Review.css";

function Review(props) {

  const [reviewData, setReviewData] = React.useState({title: "", text: "", rating: 3});

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
    postReview(
      { 
        movieId: props.movieId,
        userId: props.userId,
        reviewText: reviewData.text,
        reviewTitle: reviewData.title,
        rating: reviewData.rating
      })
        .then((res) => {
          if (res.status === 201)
            return res.json();
          else
            throw new Error(`${res.status}`);
        })
        .then((json) => {
          if (json) props.setter([...props.getter, json]);
          console.log(json);
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
    </div>
  );
}

export default Review;
