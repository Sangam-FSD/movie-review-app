import { Request, Response, NextFunction } from "express";
import { reviewsService } from "../../services/review-services";
import { ReviewNotFound, unAuthorized } from "../../services/movie-error";
import { AppError } from "../../error";
import { reviewMongoService } from "../../mongo/review/services";

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = req.params.reviewId;
    const body = req.body;

    if (!reviewId) {
      const InvalidReviewPayloadError = new ReviewNotFound();
      next(InvalidReviewPayloadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const numReviewId = Number(reviewId);
      const review = await reviewsService.getById(numReviewId);
      if (!review) {
        const reviewNotFoundError = new ReviewNotFound();
        next(reviewNotFoundError);
        return;
      }

      reviewsService.update(numReviewId, {
        movie_id: body.movie_id,
        user_id: body.user_id,
        rating: body.rating,
        review: body.review,
      });
    } else {
      const toUpdateReview = await reviewMongoService.getByIdReview(reviewId);
      if (!toUpdateReview) {
        const reviewNotFoundError = new ReviewNotFound();
        next(reviewNotFoundError);
        return;
      }

      //tocheck ownership

      const isUserOwner = req.user?.id === toUpdateReview.user_id?.toString();
      if (!isUserOwner) {
        const unAuthorizedError = new unAuthorized();
        next(unAuthorizedError);
        return;
      }
      await reviewMongoService.update(reviewId, {
        // movie_id: body.movie_id,
        // user_id: body.user_id,
        rating: body.rating,
        review: body.review,
      });
    }

    res.json({
      message: "review updated",
    });
  } catch (error) {
    const reviewError = new AppError(
      "failed to update the review. something went wrong in serever",
      500
    );
    next(reviewError);
  }
}
