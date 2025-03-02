import { AppError } from "../error";

export class MovieNotFound extends AppError {
  constructor() {
    super("Movie not found", 404);
    Error.captureStackTrace(this);
  }
}

export class InvalidMoviePlayload extends AppError {
  constructor(meta?: any) {
    super("invalid playload", 404, meta);
    Error.captureStackTrace(this);
  }
}

export class ReviewNotFound extends AppError {
  constructor() {
    super("review not found", 401);
    Error.captureStackTrace(this);
  }
}

export class unAuthorized extends AppError {
  constructor() {
    super("you are not authorized user", 401);
    Error.captureStackTrace(this);
  }
}
