import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const bodySchema = Joi.object().keys({
  groupId: Joi.number()
    .integer()
    .min(1)
    .required(),
  usersId: Joi.array()
    .items(
      Joi.number()
        .integer()
        .min(1)
    )
    .unique()
    .required(),
});

export const validateBody = (req: Request, _: Response, next: NextFunction) => {
  const { body } = req;
  const { error } = Joi.validate(body, bodySchema);
  if (error) {
    next({ ...error, name: "bodyValidationError" });
  }
  next();
};
