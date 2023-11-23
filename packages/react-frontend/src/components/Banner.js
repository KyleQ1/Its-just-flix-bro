import React, { useEffect, useState } from "react";
import "./Banner.css";

function Banner() {
	const [description, setDescription] = useState("This is a description");
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		fetchMovie()
			.then((res) => {
				if (res.status === 404 || res.status === 500) {
					throw new Error(`GET failed, status code ${res.status}`);
				} else {
					return res.json();
				}
			})
			.then((json) => {
				const movie = json[0];
				console.log(movie);
				setMovie(movie);
				setDescription(truncate(movie.overview, 150));
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function fetchMovie() {
		const promise = fetch(`http://localhost:8000/movie/popular`);
		return promise;
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
          <button className="banner_button">Review</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie.description)}</h1>
      </div>

      <div className="banner_fadeBottom" />
    </header>
  );
}

export default Banner;
