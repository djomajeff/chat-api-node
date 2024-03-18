import { deleteCollection, readCollections } from "@directus/sdk";
import client from "../utils/directus-client";
import createRoomCollection from "./rooms-collection";
import createUserCollection from "./users-collection";
import createMessageCollection from "./messages-collection";
import { manyMessagesToOneRoom, manyMessagesToOneUser } from "./relation";

const BASE_COLLECTIONS = ["users", "messages", "rooms", "rooms_members"];

async function collectionsExist() {
  const result = await client.directus.request(readCollections());
  const collections = result.map((data) => data.collection);
  const exist = collections.every((data) => BASE_COLLECTIONS.includes(data));
  return exist;
}

async function createRelations() {
  await manyMessagesToOneRoom();
  await manyMessagesToOneUser();
}

async function up() {
  await createRoomCollection();
  await createUserCollection();
  await createMessageCollection();

  await createRelations();
}

async function down() {
  await client.directus.request(deleteCollection("users"));
  await client.directus.request(deleteCollection("messages"));
  await client.directus.request(deleteCollection("rooms"));
}

export { up, down, collectionsExist };
