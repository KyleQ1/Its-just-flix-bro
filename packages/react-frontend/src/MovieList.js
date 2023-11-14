import React from "react";
import movie from "./assets/netflix-logo.png";

function MovieList(props) {
    let genre = props.genre;
    return (
        <div>
            <div id="movie-genre">
                <h1 id="genre">{genre}</h1>
            </div>
            {/* imgs are temporary */}
            <div id="movie-list">
                <img id="movie-img" src={movie} alt="Movie Title" />
                <img id="movie-img" src={movie} alt="Movie Title" />
                <img id="movie-img" src={movie} alt="Movie Title" />
                <img id="movie-img" src={movie} alt="Movie Title" />
                <img id="movie-img" src={movie} alt="Movie Title" />
                <img id="movie-img" src={movie} alt="Movie Title" />
                <img id="movie-img" src={movie} alt="Movie Title" />
                <img id="movie-img" src={movie} alt="Movie Title" />
            </div>
            
        </div>
    );
}


export default MovieList;
