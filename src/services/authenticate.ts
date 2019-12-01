import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EXPIRES_IN } from "../constants";
import { getUserDBByLogin } from "../data-access/authenticate";

export const authentificateUser = async (login: string, password: string) => {
  const passwordFromDB = await getUserDBByLogin(login);
  const match = await bcrypt.compare(password, passwordFromDB);
  if (match) {
    return jwt.sign(
      {
        login,
      },
      "secret",
      { expiresIn: EXPIRES_IN }
    );
  }
  throw new Error("Authentification error");
};
