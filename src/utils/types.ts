import { Socket } from "socket.io";
import Schema from "../models";
import {
  AuthenticationClient,
  DirectusClient,
  RestClient,
} from "@directus/sdk";

interface ShortUser {
  email: string;
  tokenVersion: number;
  id: number;
}

interface ConnectedUser {
  socket: Socket;
  data: ShortUser;
}

type DirectusClientType = DirectusClient<Schema> &
  RestClient<Schema> &
  AuthenticationClient<Schema>;

export { ConnectedUser, ShortUser, DirectusClientType };
