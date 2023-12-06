import React from "react";
import accountIcon from "../assets/account-icon.png";
import "./UserReview.css";
import Star from "./Star";

const UserReview = ({ title, text, rating }) => {
  let starArray = <></>;

  // display gold stars
  for (let i = 0; i < rating; i++)
  {
      starArray = (
          <>
              {starArray}
              <Star clicked={true} />
          </>
      )
  }
  // display remaining outlined stars
  for (let i = 0; i < 5-rating; i++)
  {
      starArray = (
          <>
              {starArray}
              <Star clicked={false} />
          </>
      )
  }
  return (
    <div className="review-container">
      <div className="profile-picture">
        <img src={accountIcon} alt="Profile" />
      </div>
      <div className="review-details">
        <h2>{title}</h2>
        <div className="rating">{starArray}</div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default UserReview;
