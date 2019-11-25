import { Request } from "express";
import { Group } from "../models/group";
import { User } from "../models/user";

interface LocalsData {
  user?: User;
  users?: User[];
  group?: Group;
  groups?: Group[];
}

export interface DataRequest extends Request {
  locals: LocalsData;
}
