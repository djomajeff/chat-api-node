import RoomUser from "./room-members.model";
import Message from "./message.model";
import User from "./user.model";

export default interface Room {
  id: number;
  title: string;
  admin: number | User;
  members: User[];
  messages: Message[];
  created_at: string;
  roomUser: number[] | RoomUser[];
}
