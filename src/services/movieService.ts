import { Movie } from "../types/MovieType";
import movieModel from "../models/Movie";
const movieService = {
  loadAPIMovies: async () => {
    const url = process.env.BASE_URL_SW! + "films/";
    const response = await fetch(url);
    const { results } = await response.json();
    const movies = await movieModel.find();

    const newMovies = results.filter((apiMovie: Movie) => {
      return !movies.some((savedMovie) => savedMovie.title === apiMovie.title);
    });

    if (newMovies.length > 0) {
      await movieModel.insertMany(newMovies);
    }
    return [...movies, ...newMovies] as Movie[];
  },
  getAllMovies: async () => {
    const movies = await movieModel.find();
    const moviesTitle = movies.map((movie) => ({
      title: movie.title,
      id: movie._id,
    }));
    return moviesTitle as Movie[];
  },
  addMovie: async (movie: Movie) => {
    const exist = await movieModel.find({ title: movie.title });
    if (exist.length > 0) return null;
    const newMovie = new movieModel(movie);
    newMovie.save();
  },
  removeMovie: async (id: string) => {
    const deletedMovie = await movieModel.findByIdAndRemove(id);
    if (!deletedMovie) return null;
    return deletedMovie;
  },
  findMovieById: async (id: string) => {
    const movie = await movieModel.findById(id);
    return movie;
  },
  updateMovie: async (id: string, updatedData: any) => {
    const movie = await movieModel.findById(id);
    if (!movie) return;
    movie.title = updatedData.title || movie.title;
    movie.episode_id = updatedData.episode_id || movie.episode_id;
    movie.opening_crawl = updatedData.opening_crawl || movie.opening_crawl;
    movie.director = updatedData.director || movie.director;
    movie.producer = updatedData.producer || movie.producer;
    movie.release_date = updatedData.release_date || movie.release_date;
    movie.characters = updatedData.characters || movie.characters;
    movie.planets = updatedData.planets || movie.planets;
    movie.starships = updatedData.starships || movie.starships;
    movie.vehicles = updatedData.vehicles || movie.vehicles;
    movie.species = updatedData.species || movie.species;
    movie.created = updatedData.created || movie.created;
    movie.edited = updatedData.edited || movie.edited;
    movie.url = updatedData.url || movie.url;
    movie.save();
    return movie;
  },
};

export default movieService;
