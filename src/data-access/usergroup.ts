import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { Group } from "../models/group";
import { User } from "../models/user";
import { BadRequestError } from "./error";
import { DataRequest } from "./interface";

export const getUserGroup = async () =>
  /* req: Request,
  res: Response,
  next: NextFunction*/
  {
    const group = await Group.findByPk(1, {
      include: [{ model: User }],
      raw: false,
      rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
    });

    const result = await group.addUsers([1, 2, 3]);
    // tslint:disable-next-line: no-console
    console.log(result);
  };
