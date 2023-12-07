const request = require("supertest");
const baseURL = "http://localhost:8000";

describe("POST and DELETE movie", () => {
  const newMovie = {
    title: "TESTMOVIE1",
    description: "TESTDESC1",
    image: "hi",
    genres: ["Drama", "Comedy"],
    popularity: 5.0,
    releaseDate: "12/6/2023",
  };
  it("should return new movie and delete", async () => {
    const response = await request(baseURL).post("/movie").send(newMovie);
    expect(response.body.title).toBe(newMovie.title);
    expect(response.statusCode).toBe(201);
    const id = response.body._id;
    const response2 = await request(baseURL).delete(`/movie/id/${id}`);
    expect(response2.body.message).toBe(
      "Movie and associated reviews deleted successfully",
    );
  });
});

describe("GET AND PUT movie by id", () => {
  it("should return updated movie", async () => {
    const id = "6556c7f6f3a85d295498ea51";
    const response = await request(baseURL).get(`/movie/id/${id}`);
    expect(response.body.title).toBe("Oppenheimer");
    const response2 = await request(baseURL)
      .put(`/movie/${id}`)
      .send({ title: "WOPpenheimer" });
    expect(response2.body.title).toBe("WOPpenheimer");
    const response3 = await request(baseURL)
      .put(`/movie/${id}`)
      .send({ title: "Oppenheimer" });
    expect(response3.body.title).toBe("Oppenheimer");
    const response4 = await request(baseURL).get(`/movie/id/${id}`);
    expect(response4.body.title).toBe("Oppenheimer");
  });
});

describe("GET movie/", () => {
  it("should return 201", async () => {
    const response = await request(baseURL).get("/movie");
    expect(response.statusCode).toBe(201);
  });
  it("should return movies", async () => {
    const response = await request(baseURL).get("/movie");
    expect(response.body.length >= 1).toBe(true);
  });
});

describe("GET movie/genre/horror", () => {
  it("should return movies", async () => {
    const response = await request(baseURL).get("/movie/genre/Horror");
    expect(response.body.length >= 1).toBe(true);
  });
});

describe("GET movie/popular", () => {
  it("should return movies", async () => {
    const response = await request(baseURL).get("/movie/popular");
    expect(response.body.length >= 1).toBe(true);
  });
});
