import { NextFunction, Request, Response } from "express";
import uuid from "uuid/v4";

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

export const getAutoSuggestUsers = (req: Request, res: Response) => {
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
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = listUsers[id];
  if (user && !user.isDeleted) {
    res.json({ user });
  } else {
    res.status(404).json({ message: `User with ${id} is not found` });
  }
};

export const createUser = (req: Request, res: Response) => {
  const { body } = req;
  const id = uuid();
  // tslint:disable-next-line: no-console
  console.log(body);
  listUsers[id] = { ...body, isDeleted: false };
  res.status(201).json({ user: { id, ...listUsers[id] } });
};

export const changeUser = (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  const user = listUsers[id];
  if (user && !user.isDeleted) {
    listUsers[id] = { ...listUsers[id], ...body };
    res.status(204).json({});
  } else {
    res.status(404).json({ message: `User with ${id} is not found` });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = listUsers[id];
  if (user && !user.isDeleted) {
    listUsers[id].isDeleted = true;
    res.status(204).json({});
  } else {
    res.status(404).json({ message: `User with ${id} is not found` });
  }
};
