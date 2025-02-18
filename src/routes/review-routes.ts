import { Express } from "express";
import { addReviewController } from "../controller/review-controller/addreviewcontroller";
import { updateReviewController } from "../controller/review-controller/updatereviewcontroller";
import { deleteReviewController } from "../controller/review-controller/deletereviewcontroller";
import { getByIdReviewController } from "../controller/review-controller/getbyidreviewcontroller";
import { getAllReviewController } from "../controller/review-controller/getallreviewcontroller";
import { authMiddleware } from "../utils/auth-middleware";

export function createReviewRoutes(app: Express) {
  app.post("/add/reviews", authMiddleware, addReviewController);
  app.put("/update/reviews/:reviewId", authMiddleware, updateReviewController);
  app.delete("/delete/reviews/:reviewId", deleteReviewController);
  app.get("/getbyId/reviews/:reviewId", getByIdReviewController);
  app.get("/getall/reviews", getAllReviewController);
}
