import express from "express";
import {
  changeUserController,
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
} from "../controllers/users";
import {
  changeUserDB,
  createUserDB,
  deleteUserDB,
  getUserDB,
  getUsersDB,
} from "../data-access/user";
import {
  validateBody,
  validateId,
  validateQuery,
} from "../services/userValidators";

const userRouter = express.Router();

userRouter.get("/users/:id", validateId, getUserDB, getUserController);

userRouter.get("/users", validateQuery, getUsersDB, getUsersController);

userRouter.post("/users", validateBody, createUserDB, createUserController);

userRouter.patch(
  "/users/:id",
  validateBody,
  validateId,
  changeUserDB,
  changeUserController
);

userRouter.delete("/users/:id", validateId, deleteUserDB, deleteUserController);

export default userRouter;
