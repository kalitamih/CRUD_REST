import { NextFunction, Request, Response } from "express";

export const getError404 = (_: Request, res: Response) => {
  res.status(404).json({ error: "Page not found" });
};

export const getError400 = (
  error: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.noData || error.isJoi) {
    res.status(400).json({ error });
    return;
  }
  next(error);
};

export const getError500 = (error: any, _: Request, res: Response) => {
  res.status(500).json({ error: "Server internal error" });
};
