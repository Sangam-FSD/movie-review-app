import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "user" },
  movie_id: { type: mongoose.Schema.ObjectId, ref: "movie" },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});

export const reviewModel = mongoose.model("reviews", reviewSchema);
