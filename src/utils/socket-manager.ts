import { Server, Socket } from "socket.io";
import Message from "../models/message.model";
import { ExtendedError } from "socket.io/dist/namespace";
import { parseToken, tokenIsRevoked, validateToken } from "./helper";
import { JwtPayload, decode } from "jsonwebtoken";
import { ConnectedUser } from "./types";

const connectedUsers: { [userId: number]: ConnectedUser } = {};

class SocketManager {
  private static io: Server;

  static init(httpServer: any) {
    this.io = new Server(httpServer);
    this.io.use(this.socketAuthenticator);
    this.io.on("connection", this.handleConnection);

    return this.io;
  }

  private static async socketAuthenticator(
    socket: Socket,
    next: (err?: ExtendedError | undefined) => void
  ) {
    const err = new Error("Forbidden Access");
    const token = parseToken(socket.handshake.headers);

    if (token.length === 0) {
      next(err);
    } else {
      try {
        const payload = await validateToken(token);
        const revoked = await tokenIsRevoked(payload as JwtPayload);
        if (revoked) {
          return next(err);
        }
        next();
      } catch (_error) {
        next(err);
      }
    }
  }

  private static async handleConnection(socket: Socket) {
    console.log("A user connected");
    const token = parseToken(socket.handshake.headers);
    const user = decode(token)! as JwtPayload;
    const connectedUser: ConnectedUser = {
      data: { email: user.email, id: user.id, tokenVersion: user._v },
      socket,
    };
    connectedUsers[user.id] = connectedUser;

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      delete connectedUsers[user.id];
    });
  }

  static joinRoom(roomId: number, userId: number) {
    const currentUser = connectedUsers[userId];

    if (currentUser) {
      const socket = currentUser.socket;

      socket.join(`room-${roomId}`);
      socket
        .to(`room-${roomId}`)
        .emit("joinRoom", `${currentUser.data.email} joined the room !`);
    }
  }

  static leaveRoom(roomId: number, userId: number) {
    const currentUser = connectedUsers[userId];
    if (currentUser) {
      const socket = currentUser.socket;

      socket.leave(`room-${roomId}`);
      socket
        .to(`room-${roomId}`)
        .emit("leaveRoom", `${currentUser.data.email} left the room !`);
    }
  }

  static sendMessageToRoom(roomId: number, userId: number, message: Message) {
    if (connectedUsers[userId]) {
      connectedUsers[userId].socket
        .to(`room-${roomId}`)
        .emit("new-message", message);
    }
  }
}

export default SocketManager;
