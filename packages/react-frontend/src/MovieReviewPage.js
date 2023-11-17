import React from "react";
import Header from "./Header";
import "./MovieReviewPage.css"

function MovieReviewPage(props) {
    return (
        <div id="landing">
            <div id="movie-background">
                <Header />
                <h2>{/*props.title*/}title</h2>
            </div>
            <div id="review-body">
                <div id="movie-info">
                    <div id="popularity">
                        <h4>1</h4>
                        <h4>2</h4>
                        <h4>3</h4>
                        <h4>4</h4>
                        <h4>5</h4>
                    </div>
                    <h3 id="genre">genre</h3>
                    <h3 id="description">description</h3>
                    <h3 id="release">release date</h3>
                </div>
                <div id="movie-reviews">
                    <h1>Review</h1>
                </div>
            </div>
        </div>
    );
}

export default MovieReviewPage