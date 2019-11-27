import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const bodySchema = Joi.object().keys({
  name: Joi.string().alphanum(),
  permissions: Joi.array()
    .items(
      Joi.string().valid(["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"])
    )
    .unique()
    .required(),
});

const idSchema = Joi.number()
  .integer()
  .min(1)
  .required();

const permissionsSchema = Joi.object().keys({
  permissions: Joi.array()
    .items(
      Joi.string().valid(["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"])
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

export const validatePermissions = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { body } = req;
  const { error } = Joi.validate(body, permissionsSchema);
  if (error) {
    next({ ...error, name: "bodyValidationError" });
  }
  next();
};
