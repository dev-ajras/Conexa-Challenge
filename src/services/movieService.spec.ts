import movieService from "../services/movieService";
import movieModel from "../models/Movie";

jest.mock("../models/Movie");

describe("movieService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  //Metodo : loadAPIMovies
  it("should load API movies and insert new ones", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        results: [{ title: "Movie 1" }, { title: "Movie 2" }],
      }),
    });

    const mockFind = jest.fn().mockResolvedValue([]);
    movieModel.find = mockFind;

    const movies = await movieService.loadAPIMovies();

    expect(movies).toEqual([{ title: "Movie 1" }, { title: "Movie 2" }]);

    expect(movieModel.insertMany).toHaveBeenCalledWith([
      { title: "Movie 1" },
      { title: "Movie 2" },
    ]);
  });

  // Metodo: getAllMovies
  it("should return an array of movies with only title and id properties", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        results: [
          { title: "Movie 1", planets: [] },
          { title: "Movie 2", planets: [] },
        ],
      }),
    });

    const mockFind = jest.fn().mockResolvedValue([]);
    movieModel.find = mockFind;

    const movies = await movieService.getAllMovies();

    const moviesTitle = movies.map((movie) => ({
      title: movie.title,
      planets: [],
    }));
    expect(movies).toEqual(moviesTitle);
  });
  //Metodo: Add movie.
  it("should add a new movie if it does not exist in the database", async () => {
    const mockMovie = { title: "New Movie" /* other properties */ };

    const mockFind = jest.fn().mockResolvedValue([]);

    movieModel.find = mockFind;

    const saveSpy = jest.spyOn(movieModel.prototype, "save");

    await movieService.addMovie(mockMovie);

    expect(mockFind).toHaveBeenCalledWith({ title: "New Movie" });

    expect(movieModel).toHaveBeenCalledWith(mockMovie);

    expect(saveSpy).toHaveBeenCalled();

    saveSpy.mockRestore();
  });

  //Metodo : removeMovie
  it("should remove a movie by its id and return the deleted movie", async () => {
    const mockDeletedMovie = {
      title: "Deleted Movie",
      _id: "id123",
    };

    const mockFindByIdAndRemove = jest.fn().mockResolvedValue(mockDeletedMovie);

    movieModel.findByIdAndRemove = mockFindByIdAndRemove;

    const deletedMovie = await movieService.removeMovie("id123");

    expect(mockFindByIdAndRemove).toHaveBeenCalledWith("id123");

    expect(deletedMovie).toEqual(mockDeletedMovie);
  });

  it("should return null if the movie does not exist in the database", async () => {
    const mockFindByIdAndRemove = jest.fn().mockResolvedValue(null);
    movieModel.findByIdAndRemove = mockFindByIdAndRemove;

    const result = await movieService.removeMovie("nonExistingId");

    expect(mockFindByIdAndRemove).toHaveBeenCalledWith("nonExistingId");

    expect(result).toBeNull();
  });

  it("should return null if the movie does not exist in the database", async () => {
    const mockFindById = jest.fn().mockResolvedValue(null);
    movieModel.findById = mockFindById;

    const result = await movieService.updateMovie("nonExistingId", {});

    expect(mockFindById).toHaveBeenCalledWith("nonExistingId");

    expect(result).toBeNull();
  });
});
