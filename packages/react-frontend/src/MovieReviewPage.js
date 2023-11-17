import React from "react";
import Header from "./Header";
import "./MovieReviewPage.css";

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
                    <div id="genre">genre</div>
                    <div id="description">description</div>
                    <div id="release">release date</div>
                </div>
                <div id="movie-reviews">
                    <h1>Review</h1>
                    <button>Submit</button>
                </div>
            </div>
        </div>
  );
}

export default MovieReviewPage;
