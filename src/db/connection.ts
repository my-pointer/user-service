import { Sequelize } from "sequelize";

const userDb = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
	host: process.env.DB_HOST,
	dialect: "mysql",
});

export default userDb;

