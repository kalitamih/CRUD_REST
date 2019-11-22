import express, { NextFunction, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAutoSuggestUsers,
  getUser,
} from "./controllers/users";
import {
  validateBody,
  validateId,
  validateQuery,
} from "./middleware/validators";

const app = express();
const port = 8081;

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

const sortByLogin = (id1: string, id2: string): number =>
  listUsers[id1].login > listUsers[id2].login ? 1 : -1;

app.get("/users", validateQuery, getAutoSuggestUsers);

app.get("/users/:id", validateId, getUser);

app.post("/users", validateBody, createUser);

app.patch("/users/:id", validateBody, validateId, (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  const user = listUsers[id];
  if (user && !user.isDeleted) {
    listUsers[id] = { ...listUsers[id], ...body };
    res.status(204).json({});
  } else {
    res.status(404).json({ message: `User with ${id} is not found` });
  }
});

app.delete("/users/:id", validateId, deleteUser);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ message: error });
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
