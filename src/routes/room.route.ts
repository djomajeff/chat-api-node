import { Router } from "express";
import {
  ensureUserIsRoomAdmin,
  ensureUserIsRoomMember,
  protectRoute,
} from "../middleware/auth.middleware";
import RoomController from "../controllers/room.contoller";
import { newRoomDataIsValid } from "../middleware/validation.middleware";

const router = Router();

/**
 * @swagger
 * /room/all:
 *   get:
 *     summary: Get all rooms
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All rooms
 *         rooms: []
 *       400:
 *         description: Error occurred
 */
router.get("/all", protectRoute, RoomController.getAllRooms);

/**
 * @swagger
 * /room/messages:
 *   get:
 *     summary: Get all messages in a room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: All messages
 *         messages: []
 *       400:
 *         description: Error occurred
 */
router.get(
  "/messages/:id",
  protectRoute,
  ensureUserIsRoomMember,
  RoomController.getRoomMessages
);

/**
 * @swagger
 * /room/{id}:
 *   get:
 *     summary: Get room details
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Room details
 *       401:
 *         description: You are not a member, then not authorized to perform this action
 *       500:
 *         description: Something went wrong
 */
router.get(
  "/:id",
  protectRoute,
  ensureUserIsRoomMember,
  RoomController.getRoomDetails
);

/**
 * @swagger
 * /room/create:
 *   post:
 *     summary: Create a new room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content: application/json
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *          type: string
 *          required: true
 *     parameters:
 *       - in: body
 *         description: The room title to edit.
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *     responses:
 *       200:
 *         description: Room created successfully
 *       500:
 *         description: Something went wrong
 */
router.post(
  "/create",
  protectRoute,
  newRoomDataIsValid,
  RoomController.createRoom
);

/**
 * @swagger
 * /room/leave:
 *   post:
 *     summary: Leave a room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         description: The room title to edit.
 *         schema:
 *            type: object
 *            properties:
 *              roomId:
 *                type: integer
 *     responses:
 *       200:
 *         description: Room left successfully
 *       500:
 *         description: Something went wrong
 */
router.post(
  "/leave",
  ensureUserIsRoomMember,
  protectRoute,
  RoomController.leaveRoom
);

/**
 * @swagger
 * /room/join:
 *   post:
 *     summary: Join a room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         description: The room title to edit.
 *         schema:
 *            type: object
 *            properties:
 *              roomId:
 *                type: integer
 *     responses:
 *       200:
 *         description: Room joined successfully
 *       500:
 *         description: Something went wrong
 */
router.post("/join", protectRoute, RoomController.joinRoom);

/**
 * @swagger
 * /room/new-message:
 *   post:
 *     summary: Send a message in a room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         description: The room title to edit.
 *         schema:
 *            type: object
 *            properties:
 *              roomId:
 *                type: integer
 *              message:
 *                type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       500:
 *         description: Something went wrong
 */
router.post(
  "/new-message",
  protectRoute,
  ensureUserIsRoomMember,
  RoomController.sendMessage
);

/**
 * @swagger
 * /room/{id}:
 *   patch:
 *     summary: Update room details
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *       - in: body
 *         description: The room title to edit.
 *         schema:
 *           type: object
 *           properties:
 *              title:
 *                type: string
 *           example:
 *              title: New room
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       500:
 *         description: Something went wrong
 *
 */
router.patch(
  "/:id",
  protectRoute,
  ensureUserIsRoomMember,
  RoomController.updateRoom
);

/**
 * @swagger
 * /room/{id}:
 *   delete:
 *     summary: Delete a room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       401:
 *         description: You are not a member, then not authorized to perform this action
 *       500:
 *         description: Something went wrong
 */
router.delete(
  "/:id",
  protectRoute,
  ensureUserIsRoomAdmin,
  RoomController.deleteRoom
);

export default router;
