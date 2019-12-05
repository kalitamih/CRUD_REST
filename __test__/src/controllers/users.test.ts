import { Response } from "express";
import {
  changeUserController,
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
} from "../../../src/controllers/users";
import { User } from "../../../src/models/user";

const res = {} as Response;

const next = () => null;

describe("user controller", () => {
  describe("getUserController", () => {
    it("User.findByPk will be invoked 1 time and with id, when id is passed in params", async () => {
      const req = {
        params: {
          id: "123",
        },
      } as any;
      const spyFindByPk = jest.spyOn(User, "findByPk");
      await getUserController(req, res, next);
      expect(spyFindByPk).toHaveBeenCalledWith("123");
      expect(spyFindByPk).toHaveBeenCalledTimes(1);
      spyFindByPk.mockClear();
    });
  });

  describe("getUsersController", () => {
    it("User.findByAll will be invoked 1 time and with right parametres, when loginSubstring and limit are passed in query", async () => {
      const req = {
        query: {
          limit: 3,
          loginSubstring: "M",
        },
      } as any;
      const spyFindAll = jest.spyOn(User, "findAll") as any;
      await getUsersController(req, res, () => null);
      const {
        limit,
        order,
        attributes: { exclude },
      } = spyFindAll.mock.calls[0][0];
      expect(limit).toBe(3);
      expect(order).toStrictEqual([["login", "ASC"]]);
      expect(exclude).toStrictEqual(["isDeleted"]);
      expect(spyFindAll).toHaveBeenCalledTimes(1);
      spyFindAll.mockClear();
    });
  });

  describe("createUserController", () => {
    const user = {
      age: 27,
      login: "kalitamih",
      password: "M1991M",
    };
    const req = {
      body: user,
    } as any;

    it("User.create is invoked, when User.findOne returns null", async () => {
      const spyFindOne = jest.spyOn(User, "findOne") as any;
      const spyCreate = jest.spyOn(User, "create") as any;
      spyFindOne.mockReturnValueOnce(Promise.resolve(null));
      await createUserController(req, res, next);
      expect(spyFindOne).toHaveBeenCalledWith({
        where: { login: "kalitamih" },
      });
      expect(spyFindOne).toHaveBeenCalledTimes(1);
      expect(spyCreate).toHaveBeenCalledWith(user);
      expect(spyCreate).toHaveBeenCalledTimes(1);
      spyFindOne.mockClear();
      spyCreate.mockClear();
    });

    it("User.create is not invoked, when User.findOne returns user's object", async () => {
      const spyFindOne = jest.spyOn(User, "findOne") as any;
      const spyCreate = jest.spyOn(User, "create") as any;
      spyFindOne.mockReturnValueOnce(Promise.resolve({ id: 1, ...user }));
      await createUserController(req, res, next);
      expect(spyFindOne).toHaveBeenCalledWith({
        where: { login: "kalitamih" },
      });
      expect(spyFindOne).toHaveBeenCalledTimes(1);
      expect(spyCreate).toHaveBeenCalledTimes(0);
      spyFindOne.mockClear();
      spyCreate.mockClear();
    });
  });

  describe("deleteUserController", () => {
    it("User.update is invoked with right params, when when id is passed in params", async () => {
      const req = {
        params: {
          id: "123",
        },
      } as any;
      const spyUpdate = jest.spyOn(User, "update") as any;
      await deleteUserController(req, res, next);
      expect(spyUpdate).toHaveBeenCalledWith(
        { isDeleted: true },
        {
          returning: true,
          where: {
            id: "123",
            isDeleted: false,
          },
        }
      );
      expect(spyUpdate).toHaveBeenCalledTimes(1);
      spyUpdate.mockClear();
    });
  });

  describe("changeUserController", () => {
    it("User.update is invoked with right params, when when id is passed in params", async () => {
      const req = {
        body: {
          age: 27,
          password: "M1991M",
        },
        params: {
          id: "123",
        },
      } as any;
      const spyUpdate = jest.spyOn(User, "update") as any;
      await changeUserController(req, res, next);
      expect(spyUpdate).toHaveBeenCalledWith(
        { age: 27, password: "M1991M" },
        {
          returning: true,
          where: {
            id: "123",
            isDeleted: false,
          },
        }
      );
      expect(spyUpdate).toHaveBeenCalledTimes(1);
      spyUpdate.mockClear();
    });
  });
});
