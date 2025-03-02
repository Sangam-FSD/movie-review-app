import express, { Request, Response, NextFunction } from "express";
import { homeController } from "./controller/home-controller";
import { createRoutes } from "./routes/movie-routes";
import { createReviewRoutes } from "./routes/review-routes";

import "./db";

import { connectMongoDb } from "../src/mongo-db";
import { createAuthRoutes } from "./routes/auth-routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.write("hello!");
//   res.end();
// });
app.use(cookieParser());

app.get("/", homeController);

createRoutes(app);

createReviewRoutes(app);

createAuthRoutes(app);

// mongodb connection
connectMongoDb().then(() => {
  console.log(`Mongodb connected!`);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("error", error);
  res.status(error.status || 500).json({
    message: error.message,
  });
});

app.listen(4002, () => {
  console.log("server started on http://localhost:4002");
});
