import { Request, Response, NextFunction } from "express";
import { tokenService } from "../../mongo/auth/token-services";

export async function logOutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loggedInUser = req.user;
    console.log("logged in user", loggedInUser);

    res.clearCookie("authorization");

    await tokenService.deleteToken({
      userId: loggedInUser?.id || "",
      token: req.cookies.authorization,
    });

    res.status(200).json({
      message: "you are logged out ",
    });
  } catch (error) {
    next({
      satatus: 500,
      message: (error as Error).message,
    });
  }
}
