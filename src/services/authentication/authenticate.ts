import bcrypt from "bcrypt";
import { getUserDBByLogin } from "../../data-access/postgresql/authenticate";
import { createToken } from "../authorization/createToken";

export const authentificateUser = async (login: string, password: string) => {
  const passwordFromDB = await getUserDBByLogin(login);
  const match = await bcrypt.compare(password, passwordFromDB);
  if (match) {
    return createToken(login);
  }
  throw new Error("Authentification error");
};
