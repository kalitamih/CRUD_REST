import { User } from "../models/user";
import { BadRequestError } from "./error";

export const getUserDBByLogin = async (login: string) => {
  const user = await User.findOne({
    where: { login },
  });
  if (!user || user.isDeleted) {
    throw new BadRequestError(`User with login ${login} is not found`);
  }
  return user.password;
};
