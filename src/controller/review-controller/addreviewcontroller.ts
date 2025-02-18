import { Request, Response, NextFunction } from "express";
import {
  InvalidMoviePlayload,
  ReviewNotFound,
} from "../../services/movie-error";
import { reviewsService } from "../../services/review-services";
import { CreateReviewsSchema } from "../../services/erro-validation";
import { reviewMongoService } from "../../mongo/review/services";
import { AppError } from "../../error";

export async function addReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const parsed = CreateReviewsSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const InvalidReviewPlayloadError = new InvalidMoviePlayload(parseError);
      next(InvalidReviewPlayloadError);
      return;
    }

    const loggedInUser = req.user;
    console.log(loggedInUser);

    if (process.env.DATABASE_TYPE === "MYSQL") {
      reviewsService.add({
        movie_id: Number(parsed.data.movie_id),
        user_id: parsed.data.user_id,
        rating: parsed.data.rating,
        review: parsed.data.review,
      });
    } else {
      await reviewMongoService.create({
        user_id: loggedInUser?.id || "",
        movie_id: parsed.data.movie_id,
        rating: parsed.data.rating,
        review: parsed.data.review,
      });
    }

    res.json({
      message: "review added sucessfully",
    });
  } catch (error) {
    console.log(error);
    const reviewError = new AppError(
      "failed to create review.something went wrong in the server",
      500
    );
    next(reviewError);
  }
}
