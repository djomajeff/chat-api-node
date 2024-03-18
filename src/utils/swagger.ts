import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config({ path: "./env/server.env" });

const swaggerOptions = {
  swagger: "3.0",
  swaggerDefinition: {
    info: {
      title: "Chat Application API",
      version: "1.0.0",
      description: "API documentation for Node.js Chat Application",
    },
    basePath: process.env.API_BASE_URL,
  },
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  definitions: {
    User: {
      type: "object",
      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        name: { type: "string" },
        created_at: { type: "date" },
        _v: { type: "integer", description: "token version" },
      },
    },
    Message: {
      type: "object",
      properties: {
        id: { type: "integer" },
        creator: { type: "integer" },
        room: { type: "integer" },
        content: { type: "string" },
        created_at: { type: "date" },
      },
    },
    Room: {
      type: "object",
      properties: {
        id: { type: "integer" },
        admin: { type: "integer" },
        members: { type: "array", items: { type: "integer" } },
        title: { type: "string" },
        created_at: { type: "date" },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;
