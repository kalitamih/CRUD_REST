import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
  public static readonly tableName = "users";

  public static initModel(sequelize: Sequelize): void {
    User.init(
      {
        age: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        isDeleted: {
          allowNull: false,
          defaultValue: false,
          type: DataTypes.BOOLEAN,
        },
        login: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING,
        },
      },
      {
        indexes: [
          {
            fields: ["login"],
            unique: true,
          },
        ],
        sequelize,
        tableName: this.tableName,
      }
    );
  }

  public id?: number;
  public age!: number;
  public login!: string;
  public password!: string;
  public isDeleted?: string;
}
