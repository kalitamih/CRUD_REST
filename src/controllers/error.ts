import { NextFunction, Request, Response } from "express";
import { LogRequest } from "../utils/interfaces";
import { logger } from "../utils/logger";

export const getError404 = (req: LogRequest, res: Response) => {
  const { id, method, url } = req;
  logger.error(
    `connectionId: ${id}, method: ${method}, url: ${url}, description: Page not found`
  );
  res.status(404).json({ error: "Page not found" });
};

export const getError400 = (
  error: any,
  req: LogRequest,
  res: Response,
  next: NextFunction
) => {
  if (error.noData || error.isJoi) {
    const { method, url } = req;
    const message: string = error.isJoi
      ? error.details[0].message
      : error.message;
    logger.error(
      `connectionId: ${req.id}, method: ${method}, url: ${url}, description: ${message}`
    );
    return res.status(400).json({ error });
  }
  next(error);
};

export const getError500 = (
  error: Error,
  req: LogRequest,
  res: Response,
  next: NextFunction
) => {
  const { id, method, url } = req;
  logger.error(
    `connectionId: ${id}, method: ${method}, url: ${url}, description: ${error}`
  );
  res.status(500).json({ error: "Internal Server Error" });
};
