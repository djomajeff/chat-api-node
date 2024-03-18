import { createItem, readItem, readItems, updateItem } from "@directus/sdk";
import client from "../utils/directus-client";
import User from "../models/user.model";

class UserService {
  static async createUser(email: string, password: string, name: string) {
    const user = await client.directus.request(
      createItem("users", {
        email,
        password,
        name,
      })
    );

    return user;
  }

  static async getUserById(id: number) {
    const user = await client.directus.request(readItem("users", id));
    return user;
  }

  static async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await client.directus.request(
      readItems("users", {
        filter: {
          email: { _eq: email },
        },
      })
    );

    if (result.length > 0) {
      return { ...result[0] };
    }
  }

  static async changeUserTokenVersion(id: number, newVersion: number) {
    await client.directus.request(
      updateItem("users", id, {
        _v: newVersion,
      })
    );
  }
}

export default UserService;
