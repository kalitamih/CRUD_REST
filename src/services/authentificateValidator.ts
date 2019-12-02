import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const bodySchema = Joi.object().keys({
  login: Joi.string()
    .alphanum()
    .required(),
  password: Joi.string()
    .alphanum()
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
