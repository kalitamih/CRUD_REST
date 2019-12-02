import { NextFunction, Request, Response } from "express";
import {
  changeGroupDB,
  createGroupDB,
  deleteGroupDB,
  getGroupDB,
  getGroupsDB,
} from "../data-access/postgresql/group";
import { Group } from "../models/group";

export const getGroupsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groups = await getGroupsDB();
    res.json({ groups });
  } catch (err) {
    next(err);
  }
};

export const getGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const group = await getGroupDB(id);
    res.status(200).json({ group });
  } catch (err) {
    next(err);
  }
};

export const createGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body }: { body: Group } = req;
  try {
    const group = await createGroupDB(body);
    res.status(201).json({ group });
  } catch (err) {
    next(err);
  }
};

export const changeGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { body }: { body: Group } = req;
  try {
    await changeGroupDB(id, body);
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

export const deleteGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await deleteGroupDB(id);
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
