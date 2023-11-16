import React from "react";
import movie from "./assets/netflix-logo.png";
import { Link } from "react-router-dom";

function MovieList(props) {
    let genre = props.genre;
    return (
        <div>
            <div id="movie-genre">
                <Link to={"/movie"}><h1 id="genre">{genre}</h1></Link>
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
