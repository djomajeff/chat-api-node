import { createCollection } from "@directus/sdk";
import client from "../utils/directus-client";

export default async function createUserCollection() {
  await client.directus.request(
    createCollection({
      collection: "users",
      schema: {
        name: "users",
        comment: "User collection",
      },
      fields: [
        {
          field: "name",
          type: "string",
        },
        {
          field: "email",
          type: "string",
        },
        {
          field: "password",
          type: "string",
        },
        {
          field: "created_at",
          type: "date",
        },
      ],
    })
  );
}
