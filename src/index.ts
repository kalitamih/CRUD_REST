import express from "express";
import { getError400, getError404, getError500 } from "./controllers/error";
import { db, dbConnect } from "./data-access/connect";
import groupRouter from "./routes/groupRouter";
import userGroupRouter from "./routes/userGroupRouter";
import userRouter from "./routes/userRouter";
import { logger, loggerInfo } from "./utils/logger";

const app = express();
const port = 8081;

import httpServer from "http";

const server = httpServer.createServer(app);

dbConnect();

app.use(express.json());

app.use(loggerInfo);

app.use("/", userRouter);

app.use("/", groupRouter);

app.use("/", userGroupRouter);

app.use(getError404);

app.use(getError400);

app.use(getError500);

process
  .on("unhandledRejection", reason => {
    logger.error(reason);
    logger.info("Closing http server.");
    server.close(async () => {
      logger.info("Http server closed.");
      process.exit(-1);
    });
  })
  .on("uncaughtException", ({ message }) => {
    logger.error(message);
    logger.info("Closing http server.");
    server.close(() => {
      logger.info("Http server closed.");
      process.exit(-1);
    });
  });

server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
