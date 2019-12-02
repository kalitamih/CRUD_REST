import { Group } from "../../models/group";
import { User } from "../../models/user";
import { BadRequestError } from "./error";

export const changeUsersToGroup = async (
  usersId: number[],
  groupId: number,
  method: string
) => {
  const t = await Group.sequelize.transaction();
  try {
    const group = await Group.findByPk(groupId, {
      include: [{ model: User }],
      raw: false,
      rejectOnEmpty: false,
      transaction: t,
    });
    if (!group) {
      throw new BadRequestError(`Group with id ${groupId} is not found.`);
    }
    for (const userId of usersId) {
      const user = await User.findByPk(userId, { transaction: t });
      if (!user) {
        throw new BadRequestError(`User with id ${userId} is not found.`);
      }
    }
    switch (method) {
      case "POST":
        await group.addUsers(usersId, { transaction: t });
        break;
      case "DELETE":
        await group.removeUsers(usersId, { transaction: t });
        break;
      default:
        throw new BadRequestError(`This method is not supported`);
    }
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};
