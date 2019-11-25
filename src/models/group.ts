import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./user";

type Permissions = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export class Group extends Model {
  public static readonly tableName = "groups";

  public static initModel(sequelize: Sequelize): void {
    Group.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        permissions: {
          allowNull: false,
          type: DataTypes.ARRAY(
            DataTypes.ENUM("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES")
          ),
        },
      },
      {
        sequelize,
        tableName: this.tableName,
      }
    );
  }

  public static initRelationships() {
    Group.belongsToMany(User, { through: "usergroup", foreignKey: "groupId" });
  }

  public id?: number;
  public name!: string;
  public permissions!: Permissions[];
}
