import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import {
  loginDataIsValid,
  registerDataIsValid,
} from "../middleware/validation.middleware";
import { protectRoute } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     tags: [Auth]
 *     parameters:
 *      - in: body
 *        description: User credentials
 *        required: true
 *        schema:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           name:
 *             type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User already exists with this credentials
 *       500:
 *         description: Something went wrong
 */
router.post("/register", registerDataIsValid, AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     parameters:
 *      - in: body
 *        description: User credentials
 *        required: true
 *        schema:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       404:
 *         description: User not found !
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Something went wrong
 */
router.post("/login", loginDataIsValid, AuthController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Something went wrong
 */
router.post("/logout", protectRoute, AuthController.logout);

export default router;
