import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  release_year: { type: Number, required: true },
  genre: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const movieModel = mongoose.model("movie", movieSchema);
