import express from "express";
import {
  changeUserController,
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
} from "../controllers/users";
import {
  validateBody,
  validateId,
  validateQuery,
} from "../services/validation/users";

const userRouter = express.Router();

userRouter.get("/users/:id", validateId, getUserController);

userRouter.get("/users", validateQuery, getUsersController);

userRouter.post("/users", validateBody, createUserController);

userRouter.patch("/users/:id", validateBody, validateId, changeUserController);

userRouter.delete("/users/:id", validateId, deleteUserController);

export default userRouter;
