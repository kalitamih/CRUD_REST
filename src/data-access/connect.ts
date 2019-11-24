import { Sequelize } from "sequelize";
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
    await db.sync();
    // tslint:disable-next-line: no-console
    console.log("Connection successfull");
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
  }
};
