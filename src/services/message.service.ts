import { createItem, readItems } from "@directus/sdk";
import client from "../utils/directus-client";
import Message from "../models/message.model";

export default class MessageService {
  public static async createMessage(
    content: string,
    roomId: number,
    userId: number
  ): Promise<Message> {
    const message = await client.directus.request(
      createItem("messages", {
        content,
        creator: userId,
        created_at: new Date().toISOString(),
        room: roomId,
      })
    );

    return {
      id: message.id,
      content: message.content,
      created_at: message.created_at,
      creator: userId,
      room: roomId,
    };
  }

  public static async getAllRoomMessages(roomId: string): Promise<Message[]> {
    const result = await client.directus.request(
      readItems("messages", {
        filter: {
          room: roomId,
        },
      })
    );

    const messages = result.map<Message>((message) => {
      return { ...message };
    });

    return messages;
  }
}
