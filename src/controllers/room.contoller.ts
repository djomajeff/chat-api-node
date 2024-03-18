import { NextFunction, Request, Response } from "express";
import RoomService from "../services/room.service";
import MessageService from "../services/message.service";
import { NotFoundError } from "../utils/error";
import SocketManager from "../utils/socket-manager";

export default class RoomController {
  static async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const { id: userId } = req.user;
      const room = await RoomService.createRoom(title, userId);
      await RoomService.addMember(room.id, userId);
      res.status(200).json({ room });
    } catch (error) {
      next(error);
    }
  }

  static async getAllRooms(_req: Request, res: Response, next: NextFunction) {
    try {
      const rooms = await RoomService.getAllRooms();
      res.status(200).json({ rooms });
    } catch (error) {
      next(error);
    }
  }

  static async getRoomDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const room = await RoomService.getRoomById(+id);
      res.status(200).json({ room });
    } catch (error) {
      next(error);
    }
  }

  static async joinRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const { roomId } = req.body;
      const { id: userId } = req.user;
      await RoomService.addMember(+roomId, userId);
      SocketManager.joinRoom(roomId, userId);
      res.status(200).json({ message: "Room joined successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async leaveRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const { roomId } = req.body;
      const { id: userId } = req.user;

      const room = await RoomService.getRoomById(roomId);
      if (!room) {
        return next(new NotFoundError("Room left successfully"));
      }

      const members = room.members ?? [];
      if (members?.length <= 1) {
        await RoomService.deleteRoom(roomId);
      } else {
        await RoomService.removeMember(roomId, userId);
        // if admin decide to leave the room change the room admin
        if (room.admin.toString() === userId.toString()) {
          await RoomService.updateRoomAdmin(room.id, members.at(0)!.id);
        }
        SocketManager.leaveRoom(roomId, +userId);
      }

      res.status(200).json({ message: "User left room successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const room = await RoomService.getRoomById(+id);
      if (!room) {
        return next(new NotFoundError("Room not found"));
      }

      await RoomService.deleteRoom(+id);
      res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      await RoomService.updateRoom(+id, title);
      res.status(200).json({ message: "Room updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async getRoomMessages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const messages = await MessageService.getAllRoomMessages(id);
      res.status(200).json({ messages });
    } catch (error) {
      next(error);
    }
  }

  static async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { message, roomId } = req.body;
      const { id: userId } = req.user;
      const createdMessage = await MessageService.createMessage(
        message,
        roomId,
        userId
      );
      SocketManager.sendMessageToRoom(+roomId, userId, createdMessage);
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      next(error);
    }
  }
}
