import express from "express";
import { changeUserGroupController } from "../controllers/usergroup";
import { validateBody } from "../services/validation/userGroup";

const userGroupRouter = express.Router();

userGroupRouter.post("/usergroup", validateBody, changeUserGroupController);

userGroupRouter.delete("/usergroup", validateBody, changeUserGroupController);

export default userGroupRouter;
