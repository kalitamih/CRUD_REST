import express from "express";
import {
  changeGroupController,
  createGroupController,
  deleteGroupController,
  getGroupController,
  getGroupsController,
} from "../controllers/groups";
import {
  changeGroupDB,
  createGroupDB,
  deleteGroupDB,
  getGroupDB,
  getGroupsDB,
} from "../data-access/group";
import {
  validateBody,
  validateId,
  validatePermissions,
} from "../services/groupValidators";

const groupRouter = express.Router();

groupRouter.get("/groups/:id", validateId, getGroupDB, getGroupController);

groupRouter.get("/groups", getGroupsDB, getGroupsController);

groupRouter.post("/groups", validateBody, createGroupDB, createGroupController);

groupRouter.patch(
  "/groups/:id",
  validateId,
  validatePermissions,
  changeGroupDB,
  changeGroupController
);

groupRouter.delete(
  "/groups/:id",
  validateId,
  deleteGroupDB,
  deleteGroupController
);

export default groupRouter;
