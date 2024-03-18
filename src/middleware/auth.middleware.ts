import { NextFunction, Request, Response } from "express";
import RoomService from "../services/room.service";
import { validateToken } from "../utils/helper";
import { NotAuthError } from "../utils/error";
import { JwtPayload } from "jsonwebtoken";
import UserService from "../services/user.service";

async function protectRoute(req: Request, _res: Response, next: NextFunction) {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return next(
      new NotAuthError("You are not authorized to access this route")
    );
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    return next(new NotAuthError("Invalid token !"));
  }

  try {
    const decoded = validateToken(token) as JwtPayload;
    const userData = await UserService.getUserById(+decoded.id);
    const tokenRevoked = decoded._v !== userData._v;
    if (tokenRevoked) {
      return next(new NotAuthError("Token revoked !"));
    }
    req.user = {
      id: userData.id,
      email: userData.email,
      tokenVersion: userData._v,
    };
    next();
  } catch (e) {
    return next(new NotAuthError("Not authorized"));
  }
}

async function ensureUserIsRoomAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const user = req.user;
  const { id } = req.params;

  try {
    const isAdmin = await RoomService.checkIfUserIsAdmin(
      Number(id),
      Number(user.id)
    );

    if (!isAdmin) {
      return next(
        new NotAuthError(
          "You are not admin, then not authorized to perform this action"
        )
      );
    }
  } catch (error) {
    return next(error);
  }

  next();
}

async function ensureUserIsRoomMember(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const user = req.user;
  const { id } = req.params;
  try {
    const isMember = await RoomService.checkIfUserIsMember(
      Number(id),
      Number(user.id)
    );

    if (!isMember) {
      return next(
        new NotAuthError(
          "You are not a member, then not authorized to perform this action"
        )
      );
    }
  } catch (error) {
    return next(error);
  }

  next();
}

export { protectRoute, ensureUserIsRoomAdmin, ensureUserIsRoomMember };
