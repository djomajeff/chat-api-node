import { Router } from "express";
import authRouter from "./auth.route";
import roomRouter from "./room.route";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */
router.use("/auth", authRouter);

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: Room management
 */
router.use("/room", roomRouter);

export default router;
