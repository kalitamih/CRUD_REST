import { NextFunction, Request, Response } from "express";
import { Group } from "../models/group";
import { User } from "../models/user";
import { BadRequestError } from "./error";
import { UserGroup } from "./interface";

export const changeUsersToGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body, method }: { body: UserGroup; method: string } = req;
  const { usersId, groupId } = body;
  const t = await Group.sequelize.transaction();
  try {
    const group = await Group.findByPk(groupId, {
      include: [{ model: User }],
      raw: false,
      rejectOnEmpty: true,
      transaction: t,
    });
    if (!group) {
      next(new BadRequestError(`Group with id ${groupId} is not found.`));
      return;
    }
    for (const userId of usersId) {
      const user = await User.findByPk(userId, { transaction: t });
      if (!user) {
        next(new BadRequestError(`User with id ${userId} in not found.`));
        return;
      }
    }
    switch (method) {
      case "POST":
        await group.addUsers(usersId, { transaction: t });
        break;
      case "DELETE":
        await group.removeUsers(usersId, { transaction: t });
        break;
      default:
        next(new BadRequestError(`This method is not supported`));
        break;
    }
    await t.commit();
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    await t.rollback();
    next(err);
  }
};
