import Schema from "../models";
import dotenv from "dotenv";
dotenv.config({ path: ["./env/directus.env", "./env/server.env"] });

import {
  authentication,
  createDirectus,
  rest,
  staticToken,
} from "@directus/sdk";
import { DirectusClientType } from "./types";

class DirectusAppClient {
  private static instance?: DirectusClientType;

  static get directus() {
    return DirectusAppClient.instance!;
  }

  static async init(): Promise<DirectusClientType | undefined> {
    try {
      if (!DirectusAppClient.instance) {
        DirectusAppClient.instance = await createDirectus<Schema>(
          process.env.DIRECTUS_URL!
        )
          .with(rest())
          .with(authentication("json", { autoRefresh: true }));
        // .with(staticToken("_Io5gQUQZaass9 - GRBW2EIfiTpfhwRrk"));

        const authData = await DirectusAppClient.instance.login(
          process.env.ADMIN_EMAIL!,
          process.env.ADMIN_PASSWORD!
        );
        DirectusAppClient.instance.setToken(authData.access_token!);

        return DirectusAppClient.instance;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default DirectusAppClient;
