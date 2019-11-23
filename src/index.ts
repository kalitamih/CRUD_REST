import express from "express";
import { Sequelize } from "sequelize";
import { getError400, getError404 } from "./controllers/error";
import userRouter from "./routes/userRouter";

const db = new Sequelize("postgres://root:nextgen@localhost:5432/users");

const dbConnect = async () => {
  try {
    await db.sync();
    // tslint:disable-next-line: no-console
    console.log("Connection successfull");
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
  }
};

const app = express();
const port = 8081;

dbConnect();

app.use(express.json());

app.use("/", userRouter);

app.use(getError404);

app.use(getError400);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
