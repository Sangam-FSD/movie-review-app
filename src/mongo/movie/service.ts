import { movieModel } from "./model";

type TMovie = {
  id: string;
  title: string;
  description: string;
  release_year: number;
  genre: string;
};

async function create(input: Omit<TMovie, "id">) {
  const movie = new movieModel({
    title: input.title,
    description: input.description,
    release_year: input.release_year,
    genre: input.genre,
  });

  await movie.save();
  return movie;
}

async function updateMovie(toUpdateMovieId: string, input: Omit<TMovie, "id">) {
  const movie = await movieModel.findById(toUpdateMovieId);

  if (!movie) {
    throw new Error("movie not found!");
  }

  // await movieModel.replaceOne(
  //   { _id: toUpdateMovieId },
  //   {
  //     title: input.title,
  //     description: input.description,
  //     genre: input.genre,
  //     release_year: input.release_year,
  //   }
  // );

  await movieModel.updateOne(
    {
      _id: toUpdateMovieId,
    },
    {
      title: input.title,
      description: input.description,
      genre: input.genre,
      release_year: input.release_year,
    }
  );
}

async function getAllMovie() {
  const movies = await movieModel.find();
  return movies;
}

async function getByIdMovie(movieId: string) {
  const movie = await movieModel.findById(movieId);
  return movie;
}

async function deleteMovie(toDeleteMovieId: string) {
  const movie = await movieModel.findByIdAndDelete({
    _id: toDeleteMovieId,
  });
  return movie;
}

export const movieMongoService = {
  create,
  updateMovie,
  getAllMovie,
  getByIdMovie,
  deleteMovie,
};
