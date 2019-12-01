import express from "express";
import httpServer from "http";
import { PORT, SHUTDOWN_TIMEOUT } from "./constants";
import { getError400, getError404, getError500 } from "./controllers/error";
import { db, dbConnect } from "./data-access/connect";
import authentificateRouter from "./routes/authentificate";
import groupRouter from "./routes/groupRouter";
import userGroupRouter from "./routes/userGroupRouter";
import userRouter from "./routes/userRouter";
import { closeConnections, logger, loggerInfo } from "./utils/logger";
import { timeout } from "./utils/timeout";

import { authorization } from "./services/authorization";

const app = express();

const server = httpServer.createServer(app);

dbConnect();

app.use(loggerInfo);

app.use(express.json());

app.use("/", authentificateRouter);

app.use("/", authorization, userRouter);

app.use("/", authorization, groupRouter);

app.use("/", authorization, userGroupRouter);

app.use(getError404);

app.use(getError400);

app.use(getError500);

const gracefulShutdown = async () => {
  server.close(error => {
    if (error) {
      logger.error(error);
      process.exit(1);
    }
  });
  await timeout(SHUTDOWN_TIMEOUT);
  await db.close();
  await closeConnections();
};

process
  .on("unhandledRejection", async reason => {
    logger.error(reason);
    await gracefulShutdown();
    process.exit(0);
  })
  .on("uncaughtException", async error => {
    logger.error(error);
    await gracefulShutdown();
    process.exit(0);
  });

server.listen(PORT, () => {
  logger.info(`server started at http://localhost:${PORT}`);
});
