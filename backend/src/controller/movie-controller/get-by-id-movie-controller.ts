import { Request, Response, NextFunction } from "express";
import { movieService } from "../../services/movie-services";
import {
  InvalidMoviePlayload,
  MovieNotFound,
} from "../../services/movie-error";
import { movieMongoService } from "../../mongo/movie/service";
import { AppError } from "../../error";

export async function getByIDMoviesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const movieId = Number(req.params.movieId);

  // const movie = await movieService.getById(movieId);

  // if (!movie) {
  //   res.status(404).json({
  //     message: "movies not found",
  //   });
  //   return;
  // }

  // res.json({
  //   data: movie,
  //   message: "movies get successfully",
  // });

  try {
    const movieId = req.params.movieId;

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const movieIdNum = Number(movieId);
      const movie = await movieService.getById(movieIdNum);
      if (!movieIdNum) {
        const invalidPayloadError = new InvalidMoviePlayload(movieIdNum);
        next(invalidPayloadError);
        return;
      }

      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }
      res.json({
        data: movie,
        message: "Movie get successfully",
      });
    } else {
      const movie = await movieMongoService.getByIdMovie(movieId);

      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }

      res.json({
        data: movie,
        message: "Movie get successfully",
      });
    }
  } catch (error) {
    const movieError = new AppError(
      "Failed to give the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
