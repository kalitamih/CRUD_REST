import { NextFunction, Request, Response } from "express";

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

interface UserData {
  user?: User;
  users?: User[];
}

interface UserRequest extends Request {
  locals: UserData;
}

const sortByLogin = (id1: string, id2: string): number =>
  listUsers[id1].login > listUsers[id2].login ? 1 : -1;

export const getUsersController = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    locals: { users = [] },
    query: { limit = 0 as number },
  } = req;
  res.json({ users: users.slice(0, limit) });
  return;
};

export const getUserController = (req: UserRequest, res: Response) => {
  const { user } = req.locals;
  res.status(200).json({ user });
};

export const createUserController = (req: UserRequest, res: Response) => {
  const { user } = req.locals;
  delete user.isDeleted;
  res.status(201).json({ user });
  return;
};

export const changeUserController = (req: Request, res: Response) => {
  res.status(204).json({});
  return;
};

export const deleteUserController = (req: Request, res: Response) => {
  res.status(204).json({});
  return;
};
