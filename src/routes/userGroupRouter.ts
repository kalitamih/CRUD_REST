import express from "express";
import { changeUserGroupController } from "../controllers/usergroup";
import { validateBody } from "../services/userGroupValidators";

const userGroupRouter = express.Router();

userGroupRouter.post("/usergroup", validateBody, changeUserGroupController);

userGroupRouter.delete("/usergroup", validateBody, changeUserGroupController);

export default userGroupRouter;
