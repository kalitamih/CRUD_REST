import { Op } from "sequelize";
import { User } from "../../models/user";
import { BadRequestError } from "./error";

export const getUserDB = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user || user.isDeleted) {
    throw new BadRequestError(`User with id ${id} is not found`);
  }
  return user;
};

export const createUserDB = async (body: User) => {
  const { login } = body;
  const user = await User.findOne({ where: { login } });
  if (user) {
    throw new BadRequestError("User with this login has already existed.");
  }
  const result = await User.create(body);
  return result.toJSON();
};

export const deleteUserDB = async (id: string) => {
  const [deletedUser] = await User.update(
    { isDeleted: true },
    {
      returning: true,
      where: {
        id,
        isDeleted: false,
      },
    }
  );
  if (!deletedUser) {
    throw new BadRequestError(`User with id ${id} is not found`);
  }
};

export const changeUserDB = async (
  age: number,
  id: string,
  password: string
) => {
  const [updatedUser] = await User.update(
    { age, password },
    {
      returning: true,
      where: {
        id,
        isDeleted: false,
      },
    }
  );
  if (!updatedUser) {
    throw new BadRequestError(`User with id ${id} is not found`);
  }
};

export const getUsersDB = async (loginSubstring: string, limit: number) => {
  const users = await User.findAll({
    attributes: { exclude: ["isDeleted"] },
    limit,
    order: [["login", "ASC"]],
    where: {
      isDeleted: false,
      login: {
        [Op.like]: `${loginSubstring}%`,
      },
    },
  });
  if (!users.length) {
    throw new BadRequestError("Appropritate users not found");
  }
  return users;
};
