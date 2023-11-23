import React from "react";
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";
import Banner from "../components/Banner";
import "../index.css";

function HomePage() {
  return (
    <div id="landing">
      <NavBar />
      <Banner />
      <MovieList genre="Action" />
      <MovieList genre="Comedy" />
      <MovieList genre="Horror" />
    </div>
  );
}

export default HomePage;
