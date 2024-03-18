import RoomMembers from "./room-members.model";
import Message from "./message.model";
import Room from "./room.model";
import User from "./user.model";

export default interface Schema {
  users: User[];
  messages: Message[];
  rooms: Room[];
  room_members: RoomMembers[];
}
