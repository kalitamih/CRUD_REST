import { NextFunction, Request, Response } from "express";
import {
  createUserController,
  getUserController,
  getUsersController,
} from "../../../src/controllers/users";
import { User } from "../../../src/models/user";

const res = {} as Response;

describe("user controller", () => {
  it("User.findByPk will be invoked 1 time and with id, when id is passed in params", async () => {
    const req = {
      params: {
        id: "123",
      },
    } as any;
    const spyFindByPk = jest.spyOn(User, "findByPk");
    await getUserController(req, res, () => null);
    expect(spyFindByPk).toHaveBeenCalledWith("123");
    expect(spyFindByPk).toHaveBeenCalledTimes(1);
  });
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
  });
  it("User.findOne and User.create will be invoked, when login, age, password are passed in body", async () => {
    const req = {
      body: {
        age: 27,
        login: "kalitamih",
        password: "M1991M",
      },
    } as any;
    const spyFindOne = jest.spyOn(User, "findOne") as any;
    const spyCreate = jest.spyOn(User, "create") as any;
    spyFindOne.mockReturnValueOnce({
      promise: () => Promise.resolve(null),
    } as any);
    await createUserController(req, res, () => null);
    expect(spyFindOne).toHaveBeenCalledTimes(1);
    expect(spyCreate).toHaveBeenCalledTimes(1);
  });
});
