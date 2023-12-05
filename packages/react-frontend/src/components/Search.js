import React, { useEffect, useRef, useState } from "react";
import "./Search.css";
import MovieCard from "./MovieSearchCard.js";

function Search() {
  const itemsPerPage = 3;
  const effectRan = useRef(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (effectRan.current) return;
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:8000/movie");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
    return () => (effectRan.current = true);
  }, []);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  const displayedMovies = searchQuery.length > 0
    ? filteredMovies.slice(0, itemsPerPage).map(movie => (
        <MovieCard key={movie._id} id={movie._id} image={movie.image} title={movie.title} />
      ))
    : null;

  return (
    <div className="search" >
      <input type="text" 
      placeholder="Title's, people, genre" 
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      />
      {displayedMovies}
    </div>
  );
}

export default Search;
