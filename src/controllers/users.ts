import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import {
  changeUserDB,
  createUserDB,
  deleteUserDB,
  getUserDB,
  getUsersDB,
} from "../data-access/postgresql/user";
import { User } from "../models/user";

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    loginSubstring,
    limit,
  }: { loginSubstring: string; limit: number } = req.query;
  try {
    const users = await getUsersDB(loginSubstring, limit);
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

export const getUserController = async (
  { params: { id } }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserDB(id);
    delete user.isDeleted;
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body }: { body: User } = req;
  try {
    const user = (await createUserDB(body)) as User;
    delete user.isDeleted;
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const changeUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { age, password },
    params: { id },
  }: { body: User; params: ParamsDictionary } = req;
  try {
    await changeUserDB(age, id, password);
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

export const deleteUserController = async (
  { params: { id } }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteUserDB(id);
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
