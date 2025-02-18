import { NextFunction, Response, Request } from "express";
import { verifyToken } from "./jwt";
import { tokenService } from "../mongo/auth/token-services";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader =
      req.headers.authorization || req.cookies["authorization"];
    ("Bearer eyjfvjkvfv.jfbvjfv.bvjj");

    if (!authorizationHeader) {
      res.status(401).json({
        message: "Token not found in header ",
      });
      return;
    }

    if (typeof authorizationHeader !== "string") {
      res.status(401).json({
        message: "Token is not a string",
      });
      return;
    }

    const token = authorizationHeader?.split(" ")[1] || "";

    if (!token) {
      res.status(401).json({
        message: "Token not found",
      });
      return;
    }

    const payload = verifyToken(token);

    const tokenInDb = await tokenService.getToken({
      token: authorizationHeader,
    });
    if (!tokenInDb) {
      res.status(401).json({
        message: "token not found. It seems you are logged out ",
      });
      return;
    }

    req.user = payload;

    next();
  } catch (error) {
    console.error(error);
    if ((error as any).name === "TokenExpiredError") {
      next({
        status: 400,
        message: "Token expired",
      });
      return;
    }
    if ((error as any).name === "JsonWebTokenError") {
      next({
        status: 400,
        message: "Invalid token",
      });
      return;
    }

    next({ message: "Internal server error", status: 500 });
  }
}
