import { Request, Response, NextFunction } from "express";
import { movieService } from "../../services/movie-services";
import {
  InvalidMoviePlayload,
  MovieNotFound,
} from "../../services/movie-error";
import { movieMongoService } from "../../mongo/movie/service";
import { AppError } from "../../error";

export async function updateMoviesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // try {
  //   const movieId = Number(req.params.movieId);
  //   const body = req.body;

  //   const movie = movieService.getById(movieId);
  //   if (!movie) {
  //     next({
  //       status: 404,
  //       message: "movie not found",
  //     });
  //     return;
  //   }

  //   movieService.update(movieId, {
  //     title: body.title,
  //     description: body.description,
  //     release_year: body.release_year,
  //     genre: body.genre,
  //   });

  //   res.json({
  //     message: "movies upated successfully",
  //   });
  // } catch (error) {
  //   console.log("error");
  //   next({
  //     message: "failed to update",
  //     status: 500,
  //   });
  // }

  try {
    const movieId = req.params.movieId;
    const body = req.body;
    if (!movieId) {
      const invalidPayloadError = new InvalidMoviePlayload(movieId);
      next(invalidPayloadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const numMovieId = Number(movieId);
      const movie = await movieService.getById(numMovieId);
      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }

      movieService.update(numMovieId, {
        title: body.title,
        description: body.description,
        release_year: body.release_year,
        genre: body.genre,
      });
    } else {
      await movieMongoService.updateMovie(movieId, {
        title: body.title,
        description: body.description,
        release_year: body.release_year,
        genre: body.genre,
      });
    }

    res.json({
      message: "Movie updated successfully.",
    });
  } catch (error) {
    const movieError = new AppError(
      "Failed to update the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
