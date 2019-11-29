import { Sequelize } from "sequelize";
import { Group } from "../models/group";
import { User } from "../models/user";
import { logger } from "../utils/logger";

export const db = new Sequelize("users", "root", "nextgen", {
  define: {
    timestamps: false,
  },
  dialect: "postgres",
  host: "localhost",
  logging: false,
  query: { raw: true },
});

export const dbConnect = async () => {
  try {
    User.initModel(db);
    Group.initModel(db);
    User.initRelationships();
    Group.initRelationships();
    await db.sync();
    logger.info("Connection successfull");
  } catch ({ message }) {
    logger.error(message);
    process.exit(-1);
  }
};
