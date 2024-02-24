import userDb from "./connection";
import { DataTypes } from "sequelize";

const userModel = userDb.define(
	"user",
	{
		fullName: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false },
		password: { type: DataTypes.TEXT, allowNull: false },
	},
	{ tableName: "tbm_users" }
);

export { userModel };

