import express from "express";
import { renewToken } from "../controllers/updateToken";

const tokenRouter = express.Router();

tokenRouter.get("/refresh", renewToken);

export default tokenRouter;
