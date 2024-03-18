import {
  createItem,
  deleteItem,
  deleteItems,
  readItem,
  readItems,
  updateItem,
} from "@directus/sdk";
import client from "../utils/directus-client";

export default class RoomService {
  static async getAllRooms() {
    const result = await client.directus.request(
      readItems("rooms", {
        fields: ["*"],
      })
    );

    return result;
  }

  static async getRoomById(id: number) {
    const result = await client.directus.request(
      readItem("rooms", id, { fields: ["*"] })
    );
    return result;
  }

  static async createRoom(content: string, creator: number) {
    const room = await client.directus.request(
      createItem("rooms", {
        title: content,
        admin: creator,
        // created_at: new Date().toISOString(),
      })
    );
    return room;
  }

  static async addMember(roomId: number, memberId: number) {
    await client.directus.request(
      createItem("room_members", {
        roomId,
        memberId,
      })
    );
  }

  static async removeMember(roomId: number, memberId: number) {
    await client.directus.request(
      deleteItems("room_members", {
        filter: {
          roomId: { _eq: roomId },
          memberId: { _eq: memberId },
        },
      })
    );
  }

  static async removeMembers(roomId: number) {
    await client.directus.request(
      deleteItems("room_members", {
        filter: {
          roomId: { _eq: roomId },
        },
      })
    );
  }

  static async updateRoomAdmin(roomId: number, userId: number) {
    await client.directus.request(
      updateItem("rooms", roomId, {
        admin: userId,
      })
    );
  }

  static async updateRoom(id: number, title: string) {
    await client.directus.request(
      updateItem("rooms", id, {
        title,
      })
    );
  }

  static async checkIfUserIsAdmin(roomId: number, userId: number) {
    const result = await client.directus.request(readItem("rooms", roomId));
    return result.admin.toString() === userId.toString();
  }

  static async checkIfUserIsMember(roomId: number, memberId: number) {
    const result = await client.directus.request(
      readItems("room_members", {
        filter: {
          roomId: { _eq: roomId },
          memberId: { _eq: memberId },
        },
      })
    );

    return result.length > 0;
  }

  static async deleteRoom(id: number) {
    const room = await client.directus.request(deleteItem("rooms", id));
    await RoomService.removeMembers(id);
    return room;
  }
}
