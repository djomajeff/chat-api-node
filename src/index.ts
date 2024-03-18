import express, { NextFunction, Response } from "express";
import cors from "cors";
import DirectusAppClient from "./utils/directus-client";
import morgan from "morgan";
import { createWriteStream } from "fs";
import { join, resolve } from "path";
import router from "./routes";
import dotenv from "dotenv";
import { errorHandler } from "./utils/error";
import { ShortUser } from "./utils/types";
import SocketManager from "./utils/socket-manager";
import { createServer } from "http";

import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./utils/swagger";

dotenv.config({ path: "./env/server.env" });

declare global {
  namespace Express {
    interface Request {
      user: ShortUser;
    }
  }
}

DirectusAppClient.init().then(() => {
  const app = express();
  const port = process.env.PORT;
  const accessLogStream = createWriteStream(
    join(resolve(__dirname, ".."), "logs", "access.log"),
    { flags: "a" }
  );

  app.use(morgan("combined", { stream: accessLogStream }));
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use((_, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  app.use("/api", router);
  app.use(errorHandler);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  SocketManager.init(createServer(app));
});
