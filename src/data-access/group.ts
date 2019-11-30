import { NextFunction, Request, Response } from "express";
import { Group } from "../models/group";
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
      return;
    }
    req.locals = { group };
    next();
  } catch (err) {
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
    const { name } = body;
    const group = await Group.findOne({ where: { name } });
    if (group) {
      next(new BadRequestError(`Group with name ${name} has already existed.`));
      return;
    }
    const result = await Group.create(body);
    req.locals = { group: result.toJSON() as Group };
    next();
  } catch (err) {
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
    const deletedGroup = await Group.destroy({
      where: { id },
    });
    if (!deletedGroup) {
      next(new BadRequestError(`Group with id ${id} is not found`));
      return;
    }
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
    const group = await Group.findByPk(id);
    const updatedGroup = await Group.update(
      { permissions },
      {
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
