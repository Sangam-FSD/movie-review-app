import { conn } from "../db";
import { connPromise } from "../db-promise";

type TNote = {
  id: number;
  title: string;
  description: string;
  release_year: number;
  genre: string;
};

let movies: TNote[] = [];

function create(input: Omit<TNote, "id">) {
  conn.query(
    `
        INSERT INTO movies
        (title,description,release_year,genre)
        VALUES
        ("${input.title}","${input.description}",${input.release_year},"${input.genre}")
        
        `,
    (err, result) => {
      if (err) {
        console.log("Eror ", err);
      } else {
        console.log("Results", result);
      }
    }
  );
}

function update(toUpdateMovieId: number, input: Omit<TNote, "id">) {
  conn.query(
    `UPDATE movies
  SET
  title="${input.title}",
  description="${input.description}",
  release_year=${input.release_year},
  genre="${input.genre}"
  WHERE
  id = ${toUpdateMovieId}`,
    (err, result) => {
      if (err) {
        console.log("update failed", err);
      } else {
        console.log("updated", result);
      }
    }
  );
}

function deleteMovie(toDeleteMovieId: number) {
  conn.query(
    `DELETE FROM movies
     WHERE id = ${toDeleteMovieId}`,
    (err, result) => {
      if (err) {
        console.log("error", err);
      } else {
        console.log("result", result);
      }
    }
  );
}

async function getById(movieId: number) {
  const conn = await connPromise;

  const [rows] = await conn.execute(
    `SELECT * FROM movies WHERE id = ${movieId}`
  );
  console.log("results", rows);
  // @ts-ignore
  return rows[0];
}

export type TSort = "asc" | "desc";
export type TSortObj = { sortkey: string; direction: TSort };

export type TPagination = {
  page: number;
  perpage: number;
};

async function getAll(sort: TSortObj, pagination: TPagination) {
  const conn = await connPromise;
  const offset = (pagination.page - 1) * pagination.perpage;

  const [rows] = await conn.execute(
    `SELECT * FROM movies ORDER BY ${sort.sortkey} ${sort.direction} LIMIT ${pagination.perpage} OFFSET ${offset}`
  );
  return rows;
}

export const movieService = {
  create,
  update,
  deleteMovie,
  getById,
  getAll,
};
