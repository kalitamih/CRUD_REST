import { Request, Response } from "express";
import { DataRequest } from "../data-access/interface";

export const getGroupsController = (req: DataRequest, res: Response) => {
  const {
    locals: { groups = [] },
  } = req;
  res.json({ groups });
  return;
};

export const getGroupController = (req: DataRequest, res: Response) => {
  const { group } = req.locals;
  res.status(200).json({ group });
};

export const createGroupController = (req: DataRequest, res: Response) => {
  const { group } = req.locals;
  res.status(201).json({ group });
  return;
};

export const changeGroupController = (req: Request, res: Response) => {
  res.status(204).json({});
  return;
};

export const deleteGroupController = (req: Request, res: Response) => {
  res.status(204).json({});
  return;
};
