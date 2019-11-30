import { NextFunction, Response } from "express";
import uuidv4 from "uuid/v4";
import winston, { format } from "winston";
import { HTTP_REFRESH } from "../constants";
import { LogRequest } from "./interfaces";

const { combine, colorize, printf } = format;
const connections = new Map();

const customFormat = printf(({ level, message, timestamp }) => {
  return `$[${level}] [${timestamp}] ${message.toLowerCase()}`;
});

export const logger = winston.createLogger({
  format: combine(format.timestamp(), colorize({ all: true }), customFormat),
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

export const loggerInfo = (
  req: LogRequest,
  res: Response,
  next: NextFunction
) => {
  req.id = uuidv4();
  const { id, method, url } = req;
  try {
    const start = Date.now();
    logger.info(`start connectionId: ${id}, method: ${method}, url: ${url}`);
    connections.set(res.connection, res);
    res.on("finish", () => {
      const duration = Date.now() - start;
      connections.delete(res.connection);
      logger.info(
        `finish connectionId: ${id}, method: ${method}, url: ${url}, duration: ${duration}`
      );
    });
    next();
  } catch (err) {
    logger.error(
      `connectionId: ${id}, method: ${req.method}, url: ${req.url}, description: Server logger handler`
    );
    next(err);
  }
};
