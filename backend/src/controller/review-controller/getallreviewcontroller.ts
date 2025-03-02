import { Request, Response, NextFunction } from "express";
import { TSort } from "../../services/movie-services";
import { reviewsService } from "../../services/review-services";
import { reviewMongoService } from "../../mongo/review/services";

export async function getAllReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("req query param", req.query);
    const sortKey = (req.query.sort_key as string) || "rating";
    const Direction = (req.query.sort_direction as TSort) || "asc";

    const page = req.query.page;
    const per_page = req.query.per_page;

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const review = await reviewsService.getAll(
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
        data: review,
        message: "get all reviews successfull",
      });
    } else {
      const reviews = await reviewMongoService.getAllReview();
      res.json({
        data: reviews,
        message: "Review get all successfully",
      });
    }
  } catch (error) {
    console.log("error");
    next((error as any).message);
  }
}
