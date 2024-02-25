import { userModel } from "../db/model";
import { TUser } from "../interfaces/user";
import { LOCALIZE as l } from "../constants/localization";
import { baseResponse, baseResponseWithData } from "../utils/baseResposne";
import axios from "axios";

const createUser = async (payload: TUser, accessToken: string) => {
	try {
		const hashedPassword = await Bun.password.hash(payload.password, {
			algorithm: "bcrypt",
			cost: 5,
		});
		const response = await userModel.create({ username: payload.username.toLowerCase(), password: hashedPassword });
		const userData = response.dataValues;

		await axios.post(
			process.env.CREDIT_SERVICE_ENDPOINT! + "/init",
			{
				customerId: userData.id,
				cardHolderName: userData.username,
			},
			{ headers: { Authorization: accessToken } }
		);

		return baseResponse(200, l.USER_CREATED);
	} catch (error) {
		return baseResponse(500, (error as Error).message);
	}
};

const getUserById = async (userId: number) => {
	try {
		const user = await userModel.findOne({ where: { id: userId }, attributes: ["id", "username"] });
		if (!user) {
			return baseResponse(404, l.USER_NOT_FOUND);
		}
		return baseResponseWithData(200, l.SUCCESS, user);
	} catch (error) {
		return baseResponse(500, (error as Error).message);
	}
};

const getUserByUsername = async (username: string) => {
	try {
		const user = await userModel.findOne({
			where: { username: username.toLowerCase() },
			attributes: ["id", "username", "password"],
		});
		if (!user) {
			return baseResponse(404, l.USER_NOT_FOUND);
		}
		return baseResponseWithData(200, l.SUCCESS, user);
	} catch (error) {
		return baseResponse(500, (error as Error).message);
	}
};

export { createUser, getUserById, getUserByUsername };

