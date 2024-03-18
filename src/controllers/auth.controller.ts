import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { generateToken, hashPassword, isValidPassword } from "../utils/helper";
import { NotAuthError, NotFoundError } from "../utils/error";

export default class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const user = await UserService.getUserByEmail(email);
      if (user) {
        return next(
          new NotAuthError("User already exists with this credentials")
        );
      }

      const hashedPassword = await hashPassword(password);
      const createdUser = await UserService.createUser(
        email,
        hashedPassword,
        name
      );
      const token = await generateToken(
        createdUser.email,
        createdUser.id,
        createdUser._v
      );

      res.status(200).json({ id: createdUser.id, token });
    } catch (error) {
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return next(new NotFoundError("User not found !"));
      }

      const isPwValid = await isValidPassword(password, user.password);
      if (!isPwValid) {
        return next(new NotAuthError("Invalid email or password"));
      }

      const tokenVersion = user._v + 1;
      const token = generateToken(user.email, user.id, tokenVersion);
      await UserService.changeUserTokenVersion(user.id, tokenVersion);

      res.status(200).json({ user, token });
    } catch (error) {
      return next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenVersion, id } = req.user;
      const newVersion = tokenVersion + 1;
      await UserService.changeUserTokenVersion(id, newVersion);
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      return next(error);
    }
  }
}
