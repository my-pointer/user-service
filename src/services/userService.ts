import { userModel } from "../db/model";
import { TUser } from "../interfaces/user";
import { LOCALIZE as l } from "../constants/localization";
import baseResponse from "../utils/baseResposne";

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

export { createUser };

