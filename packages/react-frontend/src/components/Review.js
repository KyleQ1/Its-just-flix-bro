import React from "react";
import Ratings from "./Ratings";
import userLogo from "../assets/account-icon.png";
import "./Review.css";

function Review(props) {
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
