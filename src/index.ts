import express from "express";
import Joi from "joi";
const app = express();
const port = 8080;

interface User {
  login: string;
  passsword: string;
  age: number;
  isDeleted: boolean;
}

interface ListUsers {
  [key: string]: User;
}

const listUsers: ListUsers = {};

app.get("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = listUsers.id;
  res.json({ message: "Resource fetched" });
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
