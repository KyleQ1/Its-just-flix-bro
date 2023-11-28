import React from "react";
import userLogo from "../assets/account-icon.png";
import "./Review.css";

function Review(props) {
    return(
        <div id="landing">
            <div id="review-header">
                <img id="user-icon" src={userLogo} alt="User Icon" />
                <h1>title</h1>
            </div>
            <div id="rating">
                <h4>1</h4>
                <h4>2</h4>
                <h4>3</h4>
                <h4>4</h4>
                <h4>5</h4>
            </div>
            <div id="text">message</div>
            <div id="review-button">
                <button>Submit</button>
            </div>
        </div>
    )
}

export default Review;