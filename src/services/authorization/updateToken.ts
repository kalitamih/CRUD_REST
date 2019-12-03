import { redisClient } from "../../data-access/redis/connect";

import { createToken } from "./createToken";

export const updateToken = async (login: string, refreshUserToken: string) => {
  if (refreshUserToken) {
    try {
      const refreshToken = await redisClient.getAsync(login);
      if (refreshToken === refreshUserToken) {
        return createToken(login);
      }
      throw new Error("No refresh token provided.");
    } catch (err) {
      throw new Error(err);
    }
  } else {
    throw new Error("No refresh token provided.");
  }
};
