import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    headers: { token },
  } = req;

  if (token) {
    try {
      await jwt.verify(token as string, "secret");
      next();
    } catch (err) {
      logger.error(err);
      res.status(403).json({ success: false, message: "Token expired." });
    }
  } else {
    res.status(403).json({ success: false, message: "No token provided." });
  }
};
