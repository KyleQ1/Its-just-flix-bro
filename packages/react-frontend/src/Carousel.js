import React, { useState, useEffect } from "react";
import "./Carousel.css";
import MovieCard from "./MovieCard.js";
import { ReactComponent as NextIcon } from "./assets/right-arrow.svg";
import { ReactComponent as PreviousIcon } from "./assets/left-arrow.svg";

const moviesPerPage = 7;

const Carousel = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState([]);

  // Update displayed movies when the slide changes
  useEffect(() => {
    // Calculate the start and end indices for the current page
    const startIndex = currentSlide * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    // Update displayed movies when the currentPage changes
    const newDisplayedMovies = movies.slice(startIndex, endIndex);
    setDisplayedMovies(newDisplayedMovies);
  }, [movies, currentSlide]);

  const goToNextSlide = () => {
    setCurrentSlide((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(movies.length / moviesPerPage) - 1),
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="my-carousel">
      <div
        className="carousel-container"
        style={{ transform: `translateX(${-currentSlide * 100}%)` }}
      >
        {displayedMovies.map((movie) => (
          <div
            key={movie._id}
            className={`carousel-slide`}
            style={{
              transform: `translateX(${currentSlide * 100 * moviesPerPage}%)`,
            }}
          >
            <MovieCard
              title={movie.title}
              image={movie.image}
              genres={movie.genres}
              id={movie._id}
            />
          </div>
        ))}
      </div>
      <button onClick={goToPrevSlide} disabled={currentSlide === 0}>
        <div className="icon previous">
          <PreviousIcon />
        </div>
      </button>
      <button
        onClick={goToNextSlide}
        disabled={currentSlide === Math.ceil(movies.length / moviesPerPage) - 1}
      >
        <div className="icon next">
          <NextIcon />
        </div>
      </button>
    </div>
  );
};

export default Carousel;
