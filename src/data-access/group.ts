import { NextFunction, Request, Response } from "express";
import { Group } from "../models/group";
import { User } from "../models/user";
import { BadRequestError } from "./error";
import { DataRequest } from "./interface";

export const getGroupDB = async (
  req: DataRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const group = await Group.findByPk(id);
    if (!group) {
      next(new BadRequestError(`Group with id ${id} is not found`));
    }
    req.locals = { group };
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
  }
};

export const createGroupDB = async (
  req: DataRequest,
  res: Response,
  next: NextFunction
) => {
  const { body }: { body: Group } = req;
  try {
    const { name, permissions } = body;
    const group = await Group.findOne({ where: { name } });
    if (!group) {
      next(new BadRequestError("Group with this name has already existed."));
    }
    const result = await Group.create(body);
    req.locals = { group: result.toJSON() as Group };
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
  }
};

export const deleteGroupDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await Group.destroy({
      where: { id },
    });
    /*  if (!deletedGroup) {
      next(new BadRequestError(`Group with id ${id} is not found`));
    }*/
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
  }
};

export const changeGroupDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const {
    body: { permissions },
  }: { body: Group } = req;
  try {
    const [updatedGroup] = await User.update(
      { permissions },
      {
        returning: true,
        where: {
          id,
        },
      }
    );
    if (!updatedGroup) {
      next(new BadRequestError(`Group with id ${id} is not found`));
    }
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
  }
};

export const getGroupsDB = async (
  req: DataRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const groups = await Group.findAll({});
    req.locals = { groups };
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
  }
};
