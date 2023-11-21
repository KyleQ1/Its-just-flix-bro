import React from "react";
import NavBar from "./NavBar";
import MovieList from "./MovieList";
import "./index.css";

function HomePage() {
  return (
    <div id="landing">
      <NavBar />
      <MovieList genre="Action" />
      <MovieList genre="Comedy" />
      <MovieList genre="Horror" />
    </div>
  );
}

export default HomePage;
