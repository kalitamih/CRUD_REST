import express from "express";
import {
  changeUser,
  createUser,
  deleteUser,
  getAutoSuggestUsers,
  getUser,
} from "../controllers/users";
import {
  validateBody,
  validateId,
  validateQuery,
} from "../services/validators";

const userRouter = express.Router();

userRouter.get("/users", validateQuery, getAutoSuggestUsers);

userRouter.get("/users/:id", validateId, getUser);

userRouter.post("/users", validateBody, createUser);

userRouter.patch("/users/:id", validateBody, validateId, changeUser);

userRouter.delete("/users/:id", validateId, deleteUser);

export default userRouter;
