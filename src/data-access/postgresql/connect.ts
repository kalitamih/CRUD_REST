import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { Group } from "../../models/group";
import { User } from "../../models/user";
import { logger } from "../../utils/logger";

dotenv.config();

export const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    define: {
      timestamps: false,
    },
    dialect: "postgres",
    host: process.env.DB_HOST,
    logging: false,
    query: { raw: true },
  }
);

export const dbConnect = async () => {
  try {
    User.initModel(db);
    Group.initModel(db);
    User.initRelationships();
    Group.initRelationships();
    await db.sync();
    logger.info("postgres client connect successfully");
  } catch ({ message }) {
    logger.error(message);
    process.exit(-1);
  }
};
