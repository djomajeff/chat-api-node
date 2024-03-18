import { createCollection } from "@directus/sdk";
import client from "../utils/directus-client";

export default async function createRoomCollection() {
  await client.directus.request(
    createCollection({
      collection: "rooms",
      schema: {
        name: "rooms",
        comment: "Rooms collection",
      },
      fields: [
        {
          field: "title",
          type: "string",
        },
        {
          field: "admin",
          type: "integer",
        },
        {
          field: "created_at",
          type: "date",
        },
      ],
    })
  );
}
