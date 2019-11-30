import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../models/user";
import { BadRequestError } from "./error";
import { DataRequest } from "./interface";

export const getUserDB = async (id: string) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["isDeleted"] },
  });
  if (!user || user.isDeleted) {
    throw new BadRequestError(`User with id ${id} is not found`);
  }
};

export const createUserDB = async (
  req: DataRequest,
  res: Response,
  next: NextFunction
) => {
  const { body }: { body: User } = req;
  try {
    const { login } = body;
    const user = await User.findOne({ where: { login } });
    if (user) {
      next(new BadRequestError("User with this login has already existed."));
    }
    const result = await User.create(body);
    req.locals = { user: result.toJSON() as User };
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
  }
};

export const deleteUserDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const [deletedUser] = await User.update(
      { isDeleted: true },
      {
        returning: true,
        where: {
          id,
          isDeleted: false,
        },
      }
    );
    if (!deletedUser) {
      next(new BadRequestError(`User with id ${id} is not found`));
    }
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
  }
};

export const changeUserDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const {
    body: { password, age },
  }: { body: User } = req;
  try {
    const [updatedUser] = await User.update(
      { age, password },
      {
        returning: true,
        where: {
          id,
          isDeleted: false,
        },
      }
    );
    if (!updatedUser) {
      next(new BadRequestError(`User with id ${id} is not found`));
    }
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
  }
};

export const getUsersDB = async (
  req: DataRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    loginSubstring,
    limit,
  }: { loginSubstring: string; limit: number } = req.query;
  try {
    const users = await User.findAll({
      attributes: { exclude: ["isDeleted"] },
      limit,
      order: [["login", "ASC"]],
      where: {
        isDeleted: false,
        login: {
          [Op.like]: `${loginSubstring}%`,
        },
      },
    });
    if (!users.length) {
      next(new BadRequestError("Appropritate users not found"));
    }
    req.locals = { users };
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
  }
};
