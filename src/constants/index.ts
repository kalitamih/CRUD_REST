import dotenv from "dotenv";

dotenv.config();

export const HTTP_REFRESH = {
  "Content-Type": "text/html",
  Refresh: "5",
};

export const PORT = process.env.PORT;

export const SHUTDOWN_TIMEOUT = 500;

export const TOKEN_EXPIRES_IN = 5 * 60;

export const REFRESH_TOKEN_EXPIRES_IN = 5 * 60 * 60;

export const SECRET_TOKEN = process.env.SECRET_TOKEN;

export const REFRESH_SECRET_TOKEN = process.env.REFRESH_SECRET_TOKEN;

export const STAGE = process.env.STAGE;
