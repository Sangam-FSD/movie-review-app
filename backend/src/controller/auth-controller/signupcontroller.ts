import { Request, Response, NextFunction } from "express";
import { userMongoService } from "../../mongo/auth/service";
import { hashPassword } from "../../utils/bcrypt";

export async function signUpController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const hashedPassword = await hashPassword(body.password);
    console.log("hashedPasswprd", hashedPassword);

    await userMongoService.createUser({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "You are signed up successfully!",
    });
  } catch (error) {
    console.error("Failed to signup", error);
    next(error);
  }
}
