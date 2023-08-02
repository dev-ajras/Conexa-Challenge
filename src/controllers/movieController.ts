import { Router, Request, Response } from "express";
import { messages } from "../constants/messages";
import movieService from "../services/movieService";
import { authMiddleware } from "../middlewares/auth";
const router: Router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const movies = await movieService.getAllMovies();
  if (movies) return res.status(200).json({ movies });
});

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

export default router;
