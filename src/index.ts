import express from "express";
import { getError400, getError404 } from "./controllers/error";
import userRouter from "./routes/userRouter";

const app = express();
const port = 8081;

app.use(express.json());

app.use("/", userRouter);

app.use(getError404);

app.use(getError400);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
