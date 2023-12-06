import React from "react";
import Star from "./Star";
import "./Review.css";

function SubmittedReview(props) {
  const rating = props.rating;
  let starArray = <></>;

  for (let i = 0; i < rating; i++) {
    starArray = (
      <>
        {starArray}
        <Star clicked={true} />
      </>
    );
  }
  for (let i = 0; i < 5 - rating; i++) {
    starArray = (
      <>
        {starArray}
        <Star clicked={false} />
      </>
    );
  }

  return (
    <div id="review-landing">
      <div id="review-header">
        <img id="user-icon" src={props.user} alt="User Icon" />
        <h1>{props.reviewTitle}</h1>
      </div>
      <div id="rating">{starArray}</div>
      <textarea id="text" readOnly>
        {props.reviewText}
      </textarea>
    </div>
  );
}

export default SubmittedReview;
