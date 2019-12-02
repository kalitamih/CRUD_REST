import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { REFRESH_SECRET_TOKEN } from "../constants";
import { updateToken } from "../services/updateToken";
import { logger } from "../utils/logger";

interface JwtPayload {
  login: string;
}

export const renewToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    headers: { refreshusertoken },
  } = req;
  const { login } = (await jwt.verify(
    refreshusertoken as string,
    REFRESH_SECRET_TOKEN
  )) as JwtPayload;
  try {
    const { token, refreshToken } = await updateToken(
      login,
      refreshusertoken as string
    );
    res.status(200).json({
      refreshToken,
      status: "Logged in",
      token,
    });
  } catch (err) {
    logger.error(err);
    const { message } = err;
    res.status(401).json({ message });
  }
};
