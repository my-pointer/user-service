import { IBaseResponse } from "../interfaces/baseResponse";

const baseResponse = (statusCode: number, message: string) => {
	const response: IBaseResponse = { status: statusCode, message: message ?? "" };
	return response;
};

export default baseResponse;

