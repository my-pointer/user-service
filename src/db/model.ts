import userDb from "./connection";
import { DataTypes } from "sequelize";

const userModel = userDb.define(
	"user",
	{
		username: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.TEXT, allowNull: false },
	},
	{ tableName: "tbm_users" }
);

export { userModel };

