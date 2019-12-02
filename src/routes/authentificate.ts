import express from "express";
import { sentToken } from "../controllers/authentificate";
import { validateBody } from "../services/authentificateValidator";

const authentificateRouter = express.Router();

authentificateRouter.post("/authentificate", validateBody, sentToken);

export default authentificateRouter;
