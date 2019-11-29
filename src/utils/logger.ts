import { NextFunction, Request, Response } from "express";
import winston, { format } from "winston";

export const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new winston.transports.Console()],
});

export const loggerInfo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { method, url, body } = req;
    const bodyString = JSON.stringify(body);
    logger.info(`method: ${method}, url: ${url}, body: ${bodyString}`);
    next();
  } catch (err) {
    logger.info("server.handler.failed");
    next(err);
  }
};
