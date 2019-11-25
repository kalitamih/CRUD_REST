import { Sequelize } from "sequelize";
import { Group } from "../models/group";
import { User } from "../models/user";

const db = new Sequelize("users", "root", "nextgen", {
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
    // tslint:disable-next-line: no-console
    console.log("Connection successfull");
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
  }
};
