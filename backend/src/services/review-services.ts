import { conn } from "../db";
import { connPromise } from "../db-promise";

type TNote = {
  id: number;
  movie_id: number;
  user_id: number;
  rating: number;
  review: string;
};

let reviews: TNote[] = [];

function add(input: Omit<TNote, "id">) {
  conn.query(
    `INSERT INTO reviews
        (movieId,userId,rating,review)
        VALUES
        ("${input.movie_id}","${input.user_id}","${input.rating}","${input.review}")
        `,
    (err, result) => {
      if (err) {
        console.log("error", err);
      } else {
        console.log("result", result);
      }
    }
  );
}

function update(toUpdateReviewId: number, input: Omit<TNote, "id">) {
  conn.query(
    `UPDATE reviews
  SET
  movieId="${input.movie_id}",
  userId="${input.user_id}",
  rating=${input.rating},
  review="${input.review}"
  WHERE
  id = ${toUpdateReviewId}`,
    (err, result) => {
      if (err) {
        console.log("update failed", err);
      } else {
        console.log("updated", result);
      }
    }
  );
}

function deleteReview(toDeleteReviewId: number) {
  conn.query(
    `DELETE FROM reviews WHERE id = ${toDeleteReviewId}`,
    (err, result) => {
      if (err) {
        console.log("error", err);
      } else {
        console.log("result", result);
      }
    }
  );
}

async function getById(reviewId: number) {
  const conn = await connPromise;

  const [rows] = await conn.execute(
    `SELECT * FROM reviews WHERE id = ${reviewId}`
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
    `SELECT * FROM reviews ORDER BY ${sort.sortkey} ${sort.direction} LIMIT ${pagination.perpage} OFFSET ${offset}`
  );
  return rows;
}

export const reviewsService = {
  add,
  update,
  deleteReview,
  getById,
  getAll,
};
