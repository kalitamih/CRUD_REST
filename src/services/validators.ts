import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const bodySchema = Joi.object().keys({
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required(),
  login: Joi.string().alphanum(),
  password: Joi.string()
    .alphanum()
    .required(),
});

const querySchema = Joi.object().keys({
  limit: Joi.number()
    .integer()
    .min(1)
    .max(1000)
    .required(),
  loginSubstring: Joi.string()
    .alphanum()
    .required(),
});

const idSchema = Joi.number()
  .integer()
  .min(1);

export const validateBody = (req: Request, _: Response, next: NextFunction) => {
  const { body } = req;
  const { error } = Joi.validate(body, bodySchema);
  if (error) {
    next({ ...error, name: "bodyValidationError" });
  }
  next();
};

export const validateId = (req: Request, _: Response, next: NextFunction) => {
  const {
    params: { id },
  } = req;
  const { error } = Joi.validate(id, idSchema);
  if (error) {
    next({ ...error, name: "idValidationError" });
  }
  next();
};

export const validateQuery = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { query } = req;
  const { error } = Joi.validate(query, querySchema);
  if (error) {
    next({ ...error, name: "queryValidationError" });
  }
  next();
};
