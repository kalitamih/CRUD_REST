import express from "express";
import {
  changeGroupController,
  createGroupController,
  deleteGroupController,
  getGroupController,
  getGroupsController,
} from "../controllers/groups";
import {
  validateBody,
  validateId,
  validatePermissions,
} from "../services/groupValidators";

const groupRouter = express.Router();

groupRouter.get("/groups/:id", validateId, getGroupController);

groupRouter.get("/groups", getGroupsController);

groupRouter.post("/groups", validateBody, createGroupController);

groupRouter.patch(
  "/groups/:id",
  validateId,
  validatePermissions,
  changeGroupController
);

groupRouter.delete("/groups/:id", validateId, deleteGroupController);

export default groupRouter;
