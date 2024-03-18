import { ErrorRequestHandler } from "express";

class NotFoundError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 404;
  }
}

class ValidationError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 422;
  }
}

class NotAuthError {
  message: string;
  status: number;

  constructor(message: string) {
    this.message = message;
    this.status = 401;
  }
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
};

export { NotFoundError, NotAuthError, ValidationError, errorHandler };
