import { Sequelize } from "sequelize";

const userDb = new Sequelize(
	process.env.DB_NAME as string,
	process.env.DB_USERNAME as string,
	process.env.DB_PASSWORD as string,
	{
		host: process.env.DB_HOST,
		dialect: "mysql",
	}
);

export default userDb;

