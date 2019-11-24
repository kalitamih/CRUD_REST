import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../models/user";

interface Message {
  message: string;
}

export class BadRequestError extends Error {
  public name: string;
  public noData: boolean;
  public details: Message[];
  constructor(message: string) {
    super(message);
    this.noData = true;
    this.details = [
      {
        message,
      },
    ];
    this.name = "NoDataError";
  }
}

interface UserData {
  user?: User;
  users?: User[];
}

interface UserRequest extends Request {
  locals: UserData;
}

export const getUserDB = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["isDeleted"] },
    });
    if (!user || user.isDeleted) {
      next(new BadRequestError(`User with id ${id} is not found`));
    }
    req.locals = { user };
    next();
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
  }
};

export const createUserDB = async (
  req: UserRequest,
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
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { loginSubstring }: { loginSubstring: string } = req.query;
  try {
    const users = await User.findAll({
      attributes: { exclude: ["isDeleted"] },
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
