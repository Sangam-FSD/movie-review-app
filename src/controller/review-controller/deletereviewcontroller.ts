import { Request, Response, NextFunction } from "express";
import { reviewsService } from "../../services/review-services";

export async function deleteReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = Number(req.params.reviewId);

    const review = reviewsService.getById(reviewId);
    if (!review) {
      next({
        status: 404,
        message: "something wnet wrong",
      });
    }

    reviewsService.deleteReview(reviewId);

    res.json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.log("error", error);
    next({
      message: "failed to delete movie",
      status: 500,
    });
  }
}
