import express from "express";
import { sentToken } from "../controllers/authentificate";

const authentificateRouter = express.Router();

authentificateRouter.post("/authentificate", sentToken);

export default authentificateRouter;
