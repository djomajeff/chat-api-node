import Message from "./message.model";
import Room from "./room.model";

export default interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  _v: number; // use for token versioning
  rooms: Room[];
  messages: Message[];
  createdRooms: Room[];
}
