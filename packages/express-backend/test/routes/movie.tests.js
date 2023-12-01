const supertest = require('supertest');
const app = require('./src/backend.js'); // Import your Express app using CommonJS
const mongoose = require('mongoose');
const Movie = require('../models/movie'); 
const request = supertest(app);

// Define a sample movie data for testing
const sampleMovieData = {
  title: 'Test Movie',
  description: 'This is a test movie.',
  image: 'https://example.com/test-image.jpg',
  genres: ['Action', 'Adventure'],
  popularity: 8.5,
  releaseDate: '2023-01-01',
};

// Before running the tests, connect to the database
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// After running the tests, disconnect from the database
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Movie API Endpoints', () => {
  let movieId;

  // Test the creation of a movie
  it('should create a new movie', async () => {
    const response = await request.post('/api/movies').send(sampleMovieData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', sampleMovieData.title);
    movieId = response.body._id; // Save the movieId for later use
  });

  // Test getting a movie by ID
  it('should get a movie by ID', async () => {
    const response = await request.get(`/api/movies/${movieId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', sampleMovieData.title);
  });

  // Test getting movies by genre
  it('should get movies by genre', async () => {
    const response = await request.get(`/api/movies/genre/${sampleMovieData.genres[0]}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('genres');
    expect(response.body[0].genres).toContain(sampleMovieData.genres[0]);
  });

  // Test deleting a movie
  it('should delete a movie and associated reviews', async () => {
    const response = await request.delete(`/api/movies/${movieId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Movie and associated reviews deleted successfully');
  });

  // Test getting a non-existent movie by ID
  it('should return 404 for a non-existent movie', async () => {
    const response = await request.get('/api/movies/nonexistentid');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Movie not found');
  });
});
