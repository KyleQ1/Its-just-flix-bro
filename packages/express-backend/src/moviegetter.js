// File to get all the latest new movies from the movie database
// Could setup a script to grab the latest movies
import { MovieDb } from 'moviedb-promise'
import dotenv from 'dotenv'

const result = dotenv.config({ path: '.env.local'})
const key = process.env.KEY;
if (result.error) {
    console.error("Error loading .env file:", result.error);
} else {
    console.log("Environment key " + key + " loaded successfully.");
}

const moviedb = new MovieDb(key);

const movies = () => {
    return moviedb.moviePopular()
      .then((res) => res)
      .catch((e) => console.error(e));
}

movies()
  .then((movieresults) => {
    console.log(movieresults.results)
  })
