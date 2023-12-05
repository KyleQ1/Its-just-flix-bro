import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const effectRan = React.useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    fetchMovie()
      .then((res) => {
        if (res.status === 404 || res.status === 500) {
          throw new Error(`GET failed, status code ${res.status}`);
        } else {
          return res.json();
        }
      })
      .then((json) => {
        const movie = getRandomItem(json);
        setMovie(movie);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (effectRan.current = true);
  }, []);

  function fetchMovie() {
    const promise = fetch(`http://localhost:8000/movie/popular`);
    return promise;
  }

  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Truncate movie description
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${movie.image}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">{movie.title}</h1>
        <div className="banner_buttons">
          <Link to={`/movies/${movie._id}`}>
            <button className="banner_button">Review</button>
          </Link>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">
          {truncate(movie.description, 150)}
        </h1>
      </div>

      <div className="banner_fadeBottom" />
    </header>
  );
}

export default Banner;
