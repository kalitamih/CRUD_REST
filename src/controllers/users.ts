import { NextFunction, Request, Response } from "express";
import { DataRequest } from "../data-access/interface";

export const getUsersController = (req: DataRequest, res: Response) => {
  const {
    locals: { users = [] },
  } = req;
  res.json({ users });
  return;
};

export const getUserController = (req: DataRequest, res: Response) => {
  const { user } = req.locals;
  res.status(200).json({ user });
};

export const createUserController = (req: DataRequest, res: Response) => {
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
