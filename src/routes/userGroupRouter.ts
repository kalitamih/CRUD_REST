import express from "express";
import {
  createUserGroupController,
  deleteUserGroupController,
} from "../controllers/usergroup";
import { changeUsersToGroup } from "../data-access/usergroup";
import { validateBody } from "../services/userGroupValidators";

const userGroupRouter = express.Router();

userGroupRouter.post(
  "/usergroup",
  validateBody,
  changeUsersToGroup,
  createUserGroupController
);

userGroupRouter.delete(
  "/usergroup",
  validateBody,
  changeUsersToGroup,
  deleteUserGroupController
);

export default userGroupRouter;
