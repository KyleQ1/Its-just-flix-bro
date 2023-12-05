import mongoose from "mongoose";
import MovieModel from "../src/models/movie.js";

// Mock the mongoose save method
/*jest.mock('mongoose', () => ({
  Schema: jest.fn(),
  model: jest.fn(),
}));*/

describe('Movie Model Tests', () => {
  test('Testing CREATE MOVIE -- SUCCESS', async () => {
    // Mock the movie data
    const movieData = {
      title: 'Test Movie',
      description: 'A test movie',
      image: 'test-image.jpg',
      genres: ['Action', 'Adventure'],
      popularity: 8.5,
      releaseDate: '2023-01-01',
      reviews: [],
    };
    // Mock the movie instance
    const movieInstance = new mongoose.Schema(movieData);
    // Perform the test
    const result = await MovieModel.createMovie(movieData);
    // Assertions
    expect(result).toEqual(movieInstance);;
  });

  // Add more tests for other scenarios (e.g., error cases)
});
