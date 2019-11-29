import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const getError404 = (req: Request, res: Response) => {
  res.status(404).json({ error: "Page not found" });
};

export const getError400 = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.noData || error.isJoi) {
    const { body, method, url } = req;
    const { message } = error;
    logger.error(
      `method: ${method}, url: ${url}, body: ${body}, description: ${message}`
    );
    return res.status(400).json({ error });
  }
  next(error);
};

export const getError500 = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = error;
  logger.error(message);
  res.status(500).json({ error: "Server internal error" });
};
