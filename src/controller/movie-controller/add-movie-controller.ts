import { Request, Response, NextFunction } from "express";
import { movieService, TSort } from "../../services/movie-services";
import { CreteMovieSchema } from "../../services/erro-validation";
import { InvalidMoviePlayload } from "../../services/movie-error";
import { movieMongoService } from "../../mongo/movie/service";

export async function addMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const userType = "simple_user";
  // if (userType !== "super_admin") {
  //   res.status(403).json({
  //     message: ":you are not allowed tp perform this operation",
  //   });
  // }

  const body = req.body;
  console.log(body);
  const parsed = CreteMovieSchema.safeParse(body);
  if (!parsed.success) {
    const parseError = parsed.error.flatten();
    const InvalidMoviePlayloadError = new InvalidMoviePlayload(parseError);
    next(InvalidMoviePlayloadError);
    return;
  }

  if (process.env.DATABASE_TYPE === "MYSQL") {
    movieService.create({
      title: parsed.data.title,
      description: parsed.data.description,
      release_year: parsed.data.release_year,
      genre: parsed.data.genre,
    });
  } else {
    await movieMongoService.create({
      title: parsed.data.title,
      description: parsed.data.description,
      release_year: parsed.data.release_year,
      genre: parsed.data.genre,
    });
  }

  res.json({
    message: "movies added successfully",
  });
}
