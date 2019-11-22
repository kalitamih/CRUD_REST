import express from "express";
import { getError400, getError404 } from "./controllers/error";
import {
  changeUser,
  createUser,
  deleteUser,
  getAutoSuggestUsers,
  getUser,
} from "./controllers/users";
import { validateBody, validateId, validateQuery } from "./services/validators";

const app = express();
const port = 8081;

app.use(express.json());

app.get("/users", validateQuery, getAutoSuggestUsers);

app.get("/users/:id", validateId, getUser);

app.post("/users", validateBody, createUser);

app.patch("/users/:id", validateBody, validateId, changeUser);

app.delete("/users/:id", validateId, deleteUser);

app.use(getError404);

app.use(getError400);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
