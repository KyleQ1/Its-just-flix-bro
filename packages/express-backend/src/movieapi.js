// File to get all the latest new movies from the movie database
// Could setup a script to grab the latest movies
import { MovieDb } from "moviedb-promise";
import dotenv from "dotenv";

// Get API key from themoviedatabase and put in as KEY=[KEY] in .env.local
const result = dotenv.config({ path: ".env.local" });
const key = process.env.KEY;
if (result.error) {
  console.error("Error loading .env file:", result.error);
} else {
  console.log("Environment key " + key + " loaded successfully.");
}

const moviedb = new MovieDb(key);

function getPopularMovies(p) {
  return moviedb
    .moviePopular({ language: "en-US", page: p })
    .then((res) => res)
    .catch((e) => console.error(e));
}

function getTopMovies(p) {
  return moviedb
    .movieTopRated({ language: "en-US", page: p })
    .then((res) => res)
    .catch((e) => console.error(e));
}

function getTopTVShows(p) {
  return moviedb
    .tvTopRated({ language: "en-US", page: p })
    .then((res) => res)
    .catch((e) => console.error(e));
}

function filterMoviesByEnglish(movies) {
  return movies.filter((movie) => movie.original_language === "en");
}

function postMovie(tit, desc, img, genre) {
  fetch("http://localhost:8000/movie", {
    method: "POST",
    body: JSON.stringify({
      title: tit,
      description: desc,
      images: img,
      genres: genre,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

async function updateMovies() {
  for (let i = 1; i < 10; i++) {
    let popmovies = await getPopularMovies(i);
    popmovies = filterMoviesByEnglish(popmovies.results);
    postMovie()

    let topMovies = await getTopMovies(i);
    topMovies = filterMoviesByEnglish(topMovies.results);
    movies.push(topMovies);

    let topTVShows = await getTopTVShows(i);
    topTVShows = filterMoviesByEnglish(topTVShows.results);
    movies.push(topTVShows);
  }
  return true
}

updateMovies()
  .then()
  .catch((e) => console.error(e));
