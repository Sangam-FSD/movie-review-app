import { Express } from "express";
import { signUpController } from "../controller/auth-controller/signupcontroller";
import { loginController } from "../controller/auth-controller/logincontroller";
import { logOutController } from "../controller/auth-controller/logoutcontroller";
import { authMiddleware } from "../utils/auth-middleware";

export function createAuthRoutes(app: Express) {
  app.post("/auth/signup", signUpController);
  app.post("/auth/login", loginController);
  app.post("/auth/logout", authMiddleware, logOutController);
}
