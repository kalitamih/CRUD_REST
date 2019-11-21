import express from "express";
import Joi from "joi";
import uuid from "uuid/v4";
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

const bodySchema = Joi.object().keys({
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required(),
  login: Joi.string()
    .alphanum()
    .required(),
  password: Joi.string()
    .alphanum()
    .required(),
});

const querySchema = Joi.object().keys({
  limit: Joi.number()
    .integer()
    .min(1)
    .max(1000)
    .required(),
  loginSubstring: Joi.string()
    .alphanum()
    .required(),
});

const idSchema = Joi.string().guid({ version: "uuidv4" });

const sortByLogin = (id1: string, id2: string): number =>
  listUsers[id1].login > listUsers[id2].login ? 1 : -1;

app.get("/users", async (req, res, next) => {
  const requiredUsers: string[] = [];
  const { loginSubstring, limit } = req.query;
  for (const id in listUsers) {
    if (listUsers[id].login.indexOf(loginSubstring) !== 1) {
      requiredUsers.push(id);
    }
  }
  if (!requiredUsers.length) {
    res.status(404).json({ message: "Required users do not exist" });
  }
  requiredUsers.sort(sortByLogin);
  const users = requiredUsers.slice(0, limit).map(id => listUsers[id]);
  res.json({ users });
});

app.get("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = listUsers[id];
  if (user && !user.isDeleted) {
    res.json({ user });
  } else {
    res.status(404).json({ message: `User with ${id} is not found` });
  }
});

app.post("/users", async (req, res, next) => {
  const { body } = req;
  const { error } = Joi.validate(body, bodySchema);
  if (error) {
    next(error);
  }
  const id = uuid();
  listUsers[id] = { ...body, isDeleted: false };
  res.status(201).json({ user: { id, ...listUsers[id] } });
});

app.patch("/users/:id", async (req, res, next) => {
  const { body } = req;
  const { error } = Joi.validate(body, bodySchema);
  if (error) {
    next(error);
  }
  const { id } = req.params;
  const user = listUsers[id];
  if (user && !user.isDeleted) {
    listUsers[id] = { ...listUsers[id], ...body };
    res.status(204).json({});
  } else {
    res.status(404).json({ message: `User with ${id} is not found` });
  }
});

app.delete("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = listUsers[id];
  if (user && !user.isDeleted) {
    listUsers[id].isDeleted = true;
    res.status(204).json({});
  } else {
    res.status(404).json({ message: `User with ${id} is not found` });
  }
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
