import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { authentificateUser } from "../services/authenticate";

export const sentToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { login, password },
  }: { body: User } = req;
  try {
    const token = await authentificateUser(login, password);
    res.status(201).json({ token });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
