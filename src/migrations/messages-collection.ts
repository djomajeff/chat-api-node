import { createCollection } from "@directus/sdk";
import DirectusAppClient from "../utils/directus-client";

const client = DirectusAppClient.instance!;

export default async function createMessageCollection() {
  await client.request(
    createCollection({
      collection: "messages",
      schema: {
        name: "messages",
        comment: "Message collection",
      },
      fields: [
        {
          field: "content",
          type: "string",
        },
        {
          field: "creator",
          type: "integer",
        },
        {
          field: "room",
          type: "integer",
        },
        {
          field: "created_at",
          type: "string",
        },
      ],
    })
  );
}
