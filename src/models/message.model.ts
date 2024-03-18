import Room from "./room.model";
import User from "./user.model";

export default interface Message {
  id: number;
  creator: number | User;
  room: number | Room;
  content: string;
  created_at: string;
}
