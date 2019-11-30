import { NextFunction, Request, Response } from "express";
import winston, { format } from "winston";
import { HTTP_REFRESH } from "../constants";

const connections = new Map();

export const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new winston.transports.Console()],
});

export const closeConnections = async () => {
  for (const [connection, res] of connections.entries()) {
    connections.delete(connection);
    res.writeHead(503, HTTP_REFRESH);
    res.end("Service is unavailable");
    connection.destroy();
  }
};

export const loggerInfo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { method, url } = req;
    const start = Date.now();
    connections.set(res.connection, res);
    res.on("finish", () => {
      const duration = Date.now() - start;
      connections.delete(res.connection);
      logger.info(`method: ${method}, url: ${url}, duration: ${duration}`);
    });
    next();
  } catch (err) {
    logger.info("server.handler.failed");
    next(err);
  }
};
