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

export const getAutoSuggestUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredUsers: string[] = [];
  const { loginSubstring, limit } = req.query;
  for (const id in listUsers) {
    if (listUsers[id].login.indexOf(loginSubstring) !== -1) {
      requiredUsers.push(id);
    }
  }
  if (!requiredUsers.length) {
    res.json({ error: "Appropritate users do not exist" });
    return;
  }
  requiredUsers.sort(sortByLogin);
  const users = requiredUsers.slice(0, limit).map(id => listUsers[id]);
  res.json({ users });
  return;
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = listUsers[id];
  if (user && !user.isDeleted) {
    res.json({ user });
    return;
  } else {
    res.status(400).json({ error: `User with ${id} is not found` });
    return;
  }
};

export const createUser = (req: Request, res: Response) => {
  const { body } = req;
  const id = uuid();
  listUsers[id] = { ...body, isDeleted: false };
  res.status(201).json({ user: { id, ...listUsers[id] } });
  return;
};

export const changeUser = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { id } = req.params;
  const user = listUsers[id];
  if (user && !user.isDeleted) {
    listUsers[id] = { ...listUsers[id], ...body };
    res.status(204).json({});
    return;
  } else {
    res.status(400).json({ error: `User with ${id} is not found` });
    return;
  }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = listUsers[id];
  if (user && !user.isDeleted) {
    listUsers[id].isDeleted = true;
    res.status(204).json({});
    return;
  } else {
    res.status(400).json({ error: `User with ${id} is not found` });
    return;
  }
};
