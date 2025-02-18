import { Request, Response, NextFunction } from "express";
import { movieService } from "../../services/movie-services";
import {
  InvalidMoviePlayload,
  MovieNotFound,
} from "../../services/movie-error";
import { movieMongoService } from "../../mongo/movie/service";
import { AppError } from "../../error";
export async function deleteMoviesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const movieId = Number(req.params.movieId);

  // if (!movieId) {
  //   res.status(404).json({
  //     message: "movie id not found",
  //   });
  //   return;
  // }

  // movieService.deleteMovie(movieId);

  // res.json({
  //   message: "movies deleted successfully",
  // });
  try {
    const movieId = req.params.movieId;
    if (!movieId) {
      const invalidPayLoadError = new InvalidMoviePlayload(movieId);
      next(invalidPayLoadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const movieIdNum = Number(movieId);
      const movie = movieService.getById(Number(movieIdNum));
      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }
      movieService.deleteMovie(movieIdNum);
    } else {
      await movieMongoService.deleteMovie(movieId);
    }

    res.json({
      message: "Movie deleted successfully.",
    });
  } catch (error) {
    const movieError = new AppError("Not found the MoviewID", 500);
    next(movieError);
  }
}
