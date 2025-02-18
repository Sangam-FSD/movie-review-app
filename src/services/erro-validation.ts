import { z } from "zod";

export const CreteMovieSchema = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(5).max(225),
  release_year: z.number().min(1990).max(20254),
  genre: z.string().min(1).max(20),
});

export const CreateReviewsSchema = z.object({
  movie_id: z.string().min(1).max(100),
  user_id: z.number().min(1).max(5),
  rating: z.number().min(3).max(5),
  review: z.string().min(5).max(225),
});
