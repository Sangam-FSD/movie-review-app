import { Request, Response, NextFunction } from "express";
import { reviewsService } from "../../services/review-services";
import { ReviewNotFound } from "../../services/movie-error";
import { reviewMongoService } from "../../mongo/review/services";
import { AppError } from "../../error";

export async function getByIdReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    try {
      if (process.env.DATABASE_TYPE === "MYSQL") {
        const reviewId = Number(req.params.reviewId);
        if (!reviewId) {
          const InvalidReviewPayloadError = new ReviewNotFound();
          next(InvalidReviewPayloadError);
        }

        const review = await reviewsService.getById(reviewId);

        if (!review) {
          const reviewnotfounderror = new ReviewNotFound();
          next(reviewnotfounderror);
          return;
        }

        res.json({
          data: review,
          message: "Review get by id successfully!!",
        });
      } else {
        const reviewId = req.params.reviewId;
        if (!reviewId) {
          const InvalidReviewPayloadError = new ReviewNotFound();
          next(InvalidReviewPayloadError);
          return;
        }

        const review = await reviewMongoService.getByIdReview(reviewId);
        if (!review) {
          const reviewnotfounderror = new ReviewNotFound();
          next(reviewnotfounderror);
        }
        res.json({
          data: review,
          message: "Review get by id successfully!!",
        });
      }
    } catch (error) {
      const reviewError = new AppError(
        "Failed to get the review by id.Something went wrong in the server! ",
        500
      );
      next(reviewError);
    }
  } catch (error) {
    const reviewError = new AppError("invalid.Internal server error", 500);
    next(reviewError);
  }
}
