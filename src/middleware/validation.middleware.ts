import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../utils/error";

function registerDataIsValid(req: Request, _res: Response, next: NextFunction) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return next(new ValidationError("Please provide all required fields"));
  }

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof name !== "string"
  ) {
    return next(new ValidationError("Please provide valid data"));
  }

  next();
}

function loginDataIsValid(req: Request, _res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ValidationError("Please provide all required fields"));
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return next(new ValidationError("Please provide valid data"));
  }

  next();
}

function newRoomDataIsValid(req: Request, _res: Response, next: NextFunction) {
  const { title } = req.body;

  if (!title) {
    return next(new ValidationError("Please provide all required fields"));
  }

  if (typeof title !== "string") {
    return next(new ValidationError("Please provide valid data"));
  }

  next();
}

function newMessageDataIsValid(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { message, roomId } = req.body;

  if (!message || !roomId) {
    return next(new ValidationError("Please provide all required fields"));
  }

  if (typeof message !== "string" || typeof +roomId !== "number") {
    return next(new ValidationError("Please provide valid data"));
  }

  next();
}

export {
  registerDataIsValid,
  loginDataIsValid,
  newMessageDataIsValid,
  newRoomDataIsValid,
};
