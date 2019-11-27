import express from "express";
import { getError400, getError404, getError500 } from "./controllers/error";
import { dbConnect } from "./data-access/connect";
import groupRouter from "./routes/groupRouter";
import userRouter from "./routes/userRouter";

const app = express();
const port = 8081;

dbConnect();

app.use(express.json());

app.use("/", userRouter);

app.use("/", groupRouter);

app.use(getError404);

app.use(getError400);

app.use(getError500);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
