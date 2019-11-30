import { Request } from "express";

export interface LogRequest extends Request {
  id: string;
}
