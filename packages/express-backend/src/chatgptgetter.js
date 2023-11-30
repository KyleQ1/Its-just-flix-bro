import OpenAI from "openai";
import dotenv from "dotenv";

// Get API key from chatgpt and put in .env.local named OPENAI_API_KEY=[KEY]
const result = dotenv.config({ path: ".env.local" });
if (result.error) {
  console.error("Error loading .env file:", result.error);
} else {
  console.log("Environment file loaded successfully.");
}
const openai = new OpenAI();

const defaultSystem = `You are a movie reviewer 
    and you are going to give a review for the movie given. If you 
    don’t know the movie just give a review to the best of your knowledge.
    If it's not out then continue `;
// Takes in movietitle and takes a few minutes to get a response
// Add response to database
async function sendPrompt(string, system = defaultSystem) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: system },
      { role: "user", content: string },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
}

// Create a normal distribution to get somewhat random rating
function getRating() {
  const mean = 4;
  const stdDev = 1;
  // Using the Box-Muller transform to generate random numbers
  // with a normal distribution
  const u1 = Math.random();
  const u2 = Math.random();

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const rating = mean + stdDev * z0;

  return Math.max(1, Math.min(5, Math.round(rating)));
}

async function sendReview(review, movie) { 
  const hardcodeUserID = `6567d7b3802b1fade4380b07`;
  const body = {
    movieId: movie._id,
    userId: hardcodeUserID,
    reviewText: review,
    reviewTitle: movie.title,
    rating: getRating(),
  };
  console.log(body);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  return await fetch("http://localhost:8000/review", options);
}

let i = 0;
async function processMovies(movie) {
  i++;
  const review = await sendPrompt(movie.title + "\n" + movie.description);
  const result = await sendReview(review, movie);
  if (result.status !== 201) {
    console.log("Review not sent: ", await result.json());
  }

  return { result, review };
}

// Connect to backend and get all movies
async function getAllBackendMovies() {
  const result = await fetch('http://localhost:8000/movie');
  let movies = await result.json();
  //movies = movies.filter((movie) => movie.reviews.length < 2 )
  try {
    await Promise.all(movies.map(processMovies));
  } catch (e) {
    console.error(e);
  }
  console.log(i);
}

getAllBackendMovies();
