import { userModel } from "../db/model";
import { TUser } from "../interfaces/user";
import { LOCALIZE as l } from "../constants/localization";
import { baseResponse, baseResponseWithData } from "../utils/baseResposne";

const createUser = async (payload: TUser) => {
	try {
		const hashedPassword = await Bun.password.hash(payload.password, {
			algorithm: "bcrypt",
			cost: 5,
		});
		await userModel.create({ username: payload.username.toLocaleLowerCase(), password: hashedPassword });
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

export { createUser, getUserById };

