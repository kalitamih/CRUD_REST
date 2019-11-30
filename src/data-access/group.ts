import { NextFunction, Request, Response } from "express";
import { Group } from "../models/group";
import { BadRequestError } from "./error";
import { DataRequest } from "./interface";

export const getGroupDB = async (id: string) => {
  const group = await Group.findByPk(id);
  if (!group) {
    throw new BadRequestError(`Group with id ${id} is not found`);
  }
  return group;
};

export const createGroupDB = async (body: Group) => {
  const { name } = body;
  const group = await Group.findOne({ where: { name } });
  if (group) {
    throw new BadRequestError(`Group with name ${name} has already existed.`);
  }
  const result = await Group.create(body);
  return result.toJSON();
};

export const deleteGroupDB = async (id: string) => {
  const deletedGroup = await Group.destroy({
    where: { id },
  });
  if (!deletedGroup) {
    throw new BadRequestError(`Group with id ${id} is not found`);
  }
};

export const changeGroupDB = async (id: string, body: Group) => {
  const { permissions } = body;
  const updatedGroup = await Group.update(
    { permissions },
    {
      where: {
        id,
      },
    }
  );
  if (!updatedGroup) {
    throw new BadRequestError(`Group with id ${id} is not found`);
  }
};

export const getGroupsDB = async () => await Group.findAll({});
