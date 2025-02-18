import { reviewModel } from "./model";

type TReview = {
  id: string;
  movie_id: string;
  user_id: string;
  review: string;
  rating: number;
};

async function create(input: Omit<TReview, "id">) {
  const review = new reviewModel({
    movie_id: input.movie_id,
    user_id: input.user_id,
    review: input.review,
    rating: input.rating,
  });

  await review.save();
}

async function update(
  toUpdateReviewId: string,
  input: Omit<TReview, "id" | "user_id" | "movie_id">
) {
  const movie = await reviewModel.findById(toUpdateReviewId);

  if (!movie) {
    throw new Error("movie not found!");
  }
  await reviewModel.updateOne(
    {
      _id: toUpdateReviewId,
    },
    {
      // movie_id: input.movie_id,
      // user_id: input.user_id,
      review: input.review,
      rating: input.rating,
    }
  );
}

async function getAllReview() {
  const reviews = await reviewModel.find();
  return reviews;
}

async function getByIdReview(reviewId: string) {
  const review = await reviewModel.findById(reviewId);
  return review;
}

async function deleteReview(toDeleteReviewId: string) {
  const review = await reviewModel.findByIdAndDelete({
    _id: toDeleteReviewId,
  });
  return review;
}

export const reviewMongoService = {
  create,
  update,
  getAllReview,
  getByIdReview,
  deleteReview,
};
