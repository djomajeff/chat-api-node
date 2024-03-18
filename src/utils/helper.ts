import { compare, hash } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { IncomingHttpHeaders } from "http";

dotenv.config({ path: "./env/server.env" });

const KEY = process.env.JWT_SECRET!;

function generateToken(email: string, id: number, tokenVersion: number) {
  return sign({ email, id, _v: tokenVersion }, KEY, { expiresIn: "100y" });
}

function validateToken(token: string) {
  return verify(token, KEY);
}

function tokenIsRevoked(token: JwtPayload) {
  const hasExpired = Date.now() > (token.exp ?? 0) * 1000;
  return hasExpired;
}

function isValidPassword(password: string, storedPassword: string) {
  return compare(password, storedPassword);
}

function hashPassword(password: string) {
  return hash(password, 5);
}

function parseToken(headers: IncomingHttpHeaders) {
  let result: any = headers.authorization ?? "";
  result = result.trim().split(" ");
  return result.at(-1);
}

export {
  generateToken,
  validateToken,
  tokenIsRevoked,
  isValidPassword,
  hashPassword,
  parseToken,
};
