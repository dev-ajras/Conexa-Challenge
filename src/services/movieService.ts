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
    return movies as Movie[];
  },
};

export default movieService;
