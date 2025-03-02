import { Request, Response, NextFunction } from "express";
import { userMongoService } from "../../mongo/auth/service";
import { comparePassword } from "../../utils/bcrypt";
import { generateToken, TPayload } from "../../utils/jwt";
import { EXPIRY_DATE_IN_SECONDS } from "../../utils/constants";
import { tokenService } from "../../mongo/auth/token-services";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    // validate the user in database
    const user = await userMongoService.getUserByEmail({
      email: body.email,
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const isPasswordCorrect = await comparePassword({
      hashedPassword: user.password,
      plainTextPassword: body.password,
    });

    if (!isPasswordCorrect) {
      res.status(400).json({
        message: `Incorrect email or password`,
      });
      return;
    }

    const userPayload: TPayload = {
      id: user.id,
      username: user.userName,
      email: user.email,
    };

    const token = generateToken(userPayload);

    const Bearertoken = `Bearer ${token}`;

    console.log("generated token", token);

    res.cookie("authorization", Bearertoken, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + EXPIRY_DATE_IN_SECONDS * 1000),
      sameSite: "lax",
      secure: process.env["ENVIRONMENT"] === "prod",
    });

    await tokenService.createToken({
      userId: user.id,
      token: Bearertoken,
    });

    res.status(200).json({
      data: {
        token: Bearertoken,
      },
      message: "you are logged in successfully!!",
    });
  } catch (error) {
    console.error("Failed to signup", error);
    next(error);
  }
}
