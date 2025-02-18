import { Express } from "express";
import { addMovieController } from "../controller/movie-controller/add-movie-controller";
import { updateMoviesController } from "../controller/movie-controller/update-movie-controller";
import { deleteMoviesController } from "../controller/movie-controller/delete-movie-controller";
import { getByIDMoviesController } from "../controller/movie-controller/get-by-id-movie-controller";
import { getAllMoviesController } from "../controller/movie-controller/get-all-movie-controller";

export function createRoutes(app: Express) {
  app.post("/add/movies", addMovieController);
  app.put("/movies/update/:movieId", updateMoviesController);
  app.delete("/movies/delete/:movieId", deleteMoviesController);
  app.get("/movies/:movieId", getByIDMoviesController);
  app.get("/movies", getAllMoviesController);
}
