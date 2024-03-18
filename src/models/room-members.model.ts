import Room from "./room.model";
import User from "./user.model";

interface RoomMember {
  id: number;
  memberId: number | User;
  roomId: number | Room;
}

export default RoomMember;
