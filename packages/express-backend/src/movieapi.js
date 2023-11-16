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

function postMovie(tit, desc, img, genre, pop, release) {
  fetch("http://localhost:8000/movie", {
    method: "POST",
    body: JSON.stringify({
      title: tit,
      description: desc,
      images: img,
      genres: genre,
      popularity: pop,
      release_date: release,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

// Adds full url to backdrop image path given
function appendFullURL(url) {
  return "https://image.tmdb.org/t/p/original/" + url
}

function mapGenreIdsToNames(genreIDs) {
  const genres = {"genres":
    [{"id":28,"name":"Action"},
    {"id":12,"name":"Adventure"},
    {"id":16,"name":"Animation"},
    {"id":35,"name":"Comedy"},
    {"id":80,"name":"Crime"},
    {"id":99,"name":"Documentary"},
    {"id":18,"name":"Drama"},
    {"id":10751,"name":"Family"},
    {"id":14,"name":"Fantasy"},
    {"id":36,"name":"History"},
    {"id":27,"name":"Horror"},
    {"id":10402,"name":"Music"},
    {"id":9648,"name":"Mystery"},
    {"id":10749,"name":"Romance"},
    {"id":878,"name":"Science Fiction"},
    {"id":10770,"name":"TV Movie"},
    {"id":53,"name":"Thriller"},
    {"id":10752,"name":"War"},
    {"id":37,"name":"Western"}
  ]}
  
  genreNames;
  genreIDs.map((id) => {
    genres.genres.map((genre) => {
      if (genre.id === id) {
        genreNames.push(genre.name);
      }
    })
  });
  return genreNames;
}

function getMovieParameters(movie) {
  return (movie.title, 
    movie.overview, appendFullURL(movie.backdrop_path), 
    mapGenreIdsToNames(movie.genreIDs), movie.popularity, 
    movie.release_date)
}

// TODO: Check if movies are already in the database 
async function updateMovies() {
  for (let i = 1; i <= 1; i++) {
    let popMovies = await getPopularMovies(i);
    popMovies = filterMoviesByEnglish(popMovies.results);
    popMovies.map((movie) => postMovie(getMovieParameters(movie)));

    let topMovies = await getTopMovies(i);
    topMovies = filterMoviesByEnglish(topMovies.results);
    topMovies.map((movie) => postMovie(getMovieParameters(movie)));

    let topTVShows = await getTopTVShows(i);
    topTVShows = filterMoviesByEnglish(topTVShows.results);
    topTVShows.map((movie) => postMovie(getMovieParameters(movie)));
  }
}

updateMovies()
  .then()
  .catch((e) => console.error(e));

