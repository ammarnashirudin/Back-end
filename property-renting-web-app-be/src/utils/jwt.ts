import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../configs/env.configs";

export type JwtPayload = {
  id: number;
  role: "USER" | "TENANT";
};

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, SECRET_KEY) as JwtPayload;
}
