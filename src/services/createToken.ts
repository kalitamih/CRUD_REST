import jwt from "jsonwebtoken";
import {
  REFRESH_SECRET_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN,
  SECRET_TOKEN,
  TOKEN_EXPIRES_IN,
} from "../constants";
import { redisClient } from "../data-access/redis/connect";

export const createToken = async (login: string) => {
  const token = await jwt.sign(
    {
      login,
    },
    SECRET_TOKEN,
    { expiresIn: TOKEN_EXPIRES_IN }
  );
  const refreshToken = await jwt.sign(
    {
      login,
    },
    REFRESH_SECRET_TOKEN,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );
  await redisClient.setAsync(
    login,
    refreshToken,
    "EX",
    REFRESH_TOKEN_EXPIRES_IN
  );
  return { token, refreshToken };
};
