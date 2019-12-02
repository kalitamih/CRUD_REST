import { NextFunction, Request, Response } from "express";
import { UserGroup } from "../data-access/interface";
import { changeUsersToGroup } from "../data-access/postgresql/usergroup";

export const changeUserGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { usersId, groupId },
    method,
  }: { body: UserGroup; method: string } = req;
  try {
    await changeUsersToGroup(usersId, groupId, method);
    res.status(201).json({});
  } catch (err) {
    next(err);
  }
};
