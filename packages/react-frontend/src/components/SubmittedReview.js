import React from "react";
import Star from "./Star";
import "./Review.css";

function SubmittedReview(props) {
    const numRating = props.numRating;
    let starArray = <></>;

    for (let i = 0; i < numRating; i++)
    {
        starArray = (
            <>
                {starArray}
                <Star clicked={true} />
            </>
        )
    }
    for (let i = 0; i < 5-numRating; i++)
    {
        starArray = (
            <>
                {starArray}
                <Star clicked={false} />
            </>
        )
    }
    
    return (
        <div id="review-landing">
            <div id="review-header">
                <img id="user-icon" src={props.user} alt="User Icon" />
                <h1>{props.title}</h1>
            </div>
        {starArray}
        <textarea id="text" readOnly>{props.text}</textarea>
        </div>
    )
}

export default SubmittedReview;