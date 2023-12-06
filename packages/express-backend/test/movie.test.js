import mongoose from "mongoose";
import MovieModel from "../src/models/movie.js";


describe('Movie Model CREATE Tests', () => {
  test('Testing CREATE MOVIE -- SUCCESS', async () => {
    
    const movieData = {
      title: 'Test Movie1234',
      description: 'A test movie',
      image: 'test-image.jpg',
      genres: ['Action', 'Adventure'],
      popularity: 8.5,
      releaseDate: '2023-01-01',
      reviews: [],
    };
    const result = await MovieModel.createMovie(movieData);
    expect(result instanceof MovieModel).toBeTruthy();
  }, 20000);

  test('Testing CREATE MOVIE -- ERROR', async () => {
    const invalidMovieData = {};
    await expect(async () => await MovieModel.createMovie(invalidMovieData))
    .rejects.toThrowError('Failed to create movie');
  });
});

describe('Movie Model DELETE Tests', () => {
  test('Testing DELETE MOVIE -- SUCCESS', async () => {
    const movieData = {
      title: 'Test Movie',
      description: 'A test movie',
      image: 'test-image.jpg',
      genres: ['Action', 'Adventure'],
      popularity: 8.5,
      releaseDate: '2023-01-01',
      reviews: [],
    };
    const createdMovie = await MovieModel.createMovie(movieData);

    // Attempt to delete the movie
    const result = await MovieModel.deleteMovie(createdMovie._id);

    // Assertions
    expect(result.message).toEqual('Movie and associated reviews deleted successfully');
  }, 20000);

  test('Testing DELETE MOVIE -- Movie not found', async () => {
    // Attempt to delete a non-existent movie
    const nonExistentMovieId = mongoose.Types.ObjectId(); // Creating a new random ObjectId
    await expect(async () => await MovieModel.deleteMovie(nonExistentMovieId))
      .rejects.toThrowError('Movie not found');
  });
});
