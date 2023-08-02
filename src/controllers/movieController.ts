import { Router, Request, Response } from "express";
import { messages } from "../constants/messages";
import movieService from "../services/movieService";
import { authMiddleware } from "../middlewares/auth";
const router: Router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const movies = await movieService.getAllMovies();
  if (movies) return res.status(200).json({ movies });
});

router.get(
  "/:id",
  authMiddleware("regular"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const movie = await movieService.findMovieById(id);
      res.status(200).json(movie);
    } catch (err) {
      return res.status(404).json(messages.MOVIE_NOT_FOUND);
    }
  }
);

router.post(
  "/load-api-movies",
  authMiddleware("admin"),
  async (_req: Request, res: Response) => {
    try {
      const movies = await movieService.loadAPIMovies();
      if (movies) res.status(201).json(messages.API_MOVIES_CHARGED);
    } catch (error) {
      res.status(400).json(messages.API_MOVIES_ERROR);
    }
  }
);

router.post(
  "/add",
  authMiddleware("admin"),
  async (req: Request, res: Response) => {
    const { title, ...otherProps } = req.body;

    if (!title) return res.status(400).json(messages.MOVIE_VALIDATION_ERROR);
    try {
      const saveMovie = await movieService.addMovie({
        title,
        ...otherProps,
      });
      if (saveMovie === null)
        return res.status(400).json(messages.SAME_NAME_MOVIE);
      return res.status(201).json(messages.MOVIE_CREATED);
    } catch (error: any) {
      res.status(400).json(messages.ADD_MOVIE_ERROR);
    }
  }
);

router.patch(
  "/:id",
  authMiddleware("admin"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, ...otherProperties } = req.body;
      if (!title && !otherProperties)
        return res.status(400).json(messages.UPDATE_MOVIE_ERROR);
      const data = { title, ...otherProperties };
      const movie = await movieService.updateMovie(id, data);
      res.status(200).json(movie);
    } catch (err) {
      return res.status(404).json(messages.MOVIE_NOT_FOUND);
    }
  }
);

router.delete(
  "/:id",
  authMiddleware("admin"),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const movie = await movieService.removeMovie(id);
      if (!movie === null)
        return res.status(404).json(messages.MOVIE_NOT_FOUND);
      res.status(200).json(messages.MOVIE_DELETED);
    } catch (err) {
      res.status(500).json(messages.ERROR_SERVER);
    }
  }
);

export default router;
