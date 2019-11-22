import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";

export const getError404 = (_: Request, res: Response) => {
  res.status(404).json({ error: "Page not found" });
};

export const getError400 = (
  error: ValidationError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({ error });
};
