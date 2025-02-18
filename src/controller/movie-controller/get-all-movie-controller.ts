import { Request, Response, NextFunction } from "express";
import { movieService } from "../../services/movie-services";
import { TSort } from "../../services/movie-services";
import { movieMongoService } from "../../mongo/movie/service";

export async function getAllMoviesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // try {
  //   console.log("req query param", req.query);
  //   const sortKey = (req.query.sort_key as string) || "release_year";
  //   const Direction = (req.query.sort_direction as TSort) || "asc";

  //   const page = req.query.page;
  //   const per_page = req.query.per_page;

  //   const movie = await movieService.getAll(
  //     {
  //       sortkey: sortKey,
  //       direction: Direction,
  //     },
  //     {
  //       page: Number(page),
  //       perpage: Number(per_page),
  //     }
  //   );

  //   res.json({
  //     data: movie,
  //     message: "movies get all successfully",
  //   });
  // } catch (error) {
  //   console.log("error");
  //   next((error as any).message);
  // }

  console.log("req query param", req.query);
  const sortKey = (req.query.sort_key as string) || "release_year";
  const Direction = (req.query.sort_direction as TSort) || "asc";

  const page = req.query.page;
  const per_page = req.query.per_page;

  if (process.env.DATABASE_TYPE === "MYSQL") {
    const movies = await movieService.getAll(
      {
        sortkey: sortKey,
        direction: Direction,
      },
      {
        page: Number(page),
        perpage: Number(per_page),
      }
    );
    res.json({
      data: movies,
      message: "Movie get all successfully.",
    });
  } else {
    const movies = await movieMongoService.getAllMovie();
    res.json({
      data: movies,
      message: "Movie get all successfully.",
    });
  }
}
