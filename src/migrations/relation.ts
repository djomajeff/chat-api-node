import { createRelation } from "@directus/sdk";
import client from "../utils/directus-client";

async function manyMessagesToOneUser() {
  await client.directus.request(
    createRelation({
      collection: "messages",
      field: "creator",
      related_collection: "users",
      schema: {
        table: "messages",
        column: "creator",
        foreign_key_table: "users",
        foreign_key_column: "id",
        constraint_name: "messages_creator_foreign",
        on_update: "NO ACTION",
        on_delete: "SET NULL",
      },
      meta: {
        many_collection: "messages",
        many_field: "creator",
        one_collection: "users",
        one_deselect_action: "nullify",
      },
    })
  );
}

async function manyMessagesToOneRoom() {
  await client.directus.request(
    createRelation({
      collection: "messages",
      field: "room",
      related_collection: "rooms",
      schema: {
        table: "messages",
        column: "room",
        foreign_key_table: "rooms",
        foreign_key_column: "id",
        constraint_name: "messages_room_foreign",
        on_update: "NO ACTION",
        on_delete: "SET NULL",
      },
      meta: {
        many_collection: "messages",
        many_field: "room",
        one_collection: "rooms",
        one_deselect_action: "nullify",
      },
    })
  );
}

export { manyMessagesToOneRoom, manyMessagesToOneUser };
