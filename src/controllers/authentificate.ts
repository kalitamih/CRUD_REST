import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { authentificateUser } from "../services/authentication/authenticate";
import { logger } from "../utils/logger";

export const sentToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { login, password },
  }: { body: User } = req;
  try {
    const { token, refreshToken } = await authentificateUser(login, password);
    res.status(200).json({
      refreshToken,
      status: "Logged in",
      token,
    });
  } catch (err) {
    logger.error(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
