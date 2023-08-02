import cors from "cors";
import express from "express";
import { databaseAccess } from "../helpers/db";
import userRouter from "../controllers/userController";
import movieRouter from "../controllers/movieController";

export default function startApi() {
  try {
    const app = express();
    const port = process.env.PORT ?? 5001;

    app.use(cors());

    app.use(
      express.urlencoded({
        limit: "2mb",
        parameterLimit: 100000,
        extended: false,
      })
    );

    app.use(
      express.json({
        limit: "2mb",
      })
    );

    databaseAccess();

    app.get("/liveness", (_, response) => {
      response.json("running...");
    });

    app.use("/users", userRouter);
    app.use("/movies", movieRouter);

    app.listen(port, () => {
      console.log(`🚀🌈 Conexa server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("❌ Failed to start server.");
  }
}
