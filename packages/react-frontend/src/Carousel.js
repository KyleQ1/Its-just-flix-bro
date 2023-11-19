import React, { useState, useEffect } from "react";
import "./Carousel.css"; // Import your carousel styles
import MovieCard from "./MovieCard.js";

let moviesPerPage = 7;

const Carousel = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState([]);

  const startIndex = currentSlide * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % movies.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + movies.length) % movies.length,
    );
  };

  // Update displayed movies when the slide changes
  useEffect(() => {
    const newDisplayedMovies = movies.slice(startIndex, endIndex);
    setDisplayedMovies(newDisplayedMovies);
  }, [movies, currentSlide, startIndex, endIndex]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;

      // Get the dimensions of your carousel container
      const carouselContainer = document.querySelector(".carousel-container");
      const carouselWidth = carouselContainer.clientWidth;
      console.log(carouselWidth, viewportWidth);

      // Check if the carousel is too big or off the screen
      const isTooBig = carouselWidth > viewportWidth;

      if (isTooBig) {
        console.log("Carousel is too big or off the screen.");
        moviesPerPage -= 1;
      }
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Attach the resize event listener after the DOM is ready
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("resize", handleResize);
      handleResize(); // Initial check on mount
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [movies]);

  // Check if movies data is undefined
  if (!movies) {
    return <div>Loading...</div>; // You can render a loading state or handle it in your own way
  }

  // Check if there are no movies to display
  if (movies.length === 0) {
    return <div>No movies available.</div>; // You can render a message for no movies
  }
  return (
    <div className="my-carousel">
      <div className="carousel-container">
        {displayedMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`carousel-slide ${
              index === currentSlide ? "active" : ""
            }`}
          >
            <MovieCard title={movie.title} image={movie.image} id={movie._id} />
          </div>
        ))}
      </div>
      <button onClick={goToPrevSlide} disabled={currentSlide === 0}>
        Previous
      </button>
      <button
        onClick={goToNextSlide}
        disabled={currentSlide === Math.ceil(movies.length / moviesPerPage) - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
