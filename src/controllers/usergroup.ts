import { Request, Response } from "express";

export const createUserGroupController = (req: Request, res: Response) => {
  res.status(201).json({});
  return;
};

export const deleteUserGroupController = (req: Request, res: Response) => {
  res.status(204).json({});
  return;
};
