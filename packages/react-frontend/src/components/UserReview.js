import React from "react";
import accountIcon from "../assets/account-icon.png";
import "./UserReview.css";

const UserReview = ({ title, text, rating }) => {
  return (
    <div className="review-container">
      <div className="profile-picture">
        <img src={accountIcon} alt="Profile" />
      </div>
      <div className="review-details">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="rating">{`Rating: ${rating}/5`}</div>
      </div>
    </div>
  );
};

export default UserReview;
