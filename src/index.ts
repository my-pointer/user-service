import { Elysia } from "elysia";
import userDb from "./db/connection";
import { createUser, getUserById, getUserByUsername } from "./services/userService";
import { TUser } from "./interfaces/user";

const app = new Elysia();
const PORT: any = process.env.PORT;

app.group("/api/v1/user", (router) =>
	router
		.get("/", () => "Hello user service")
		.get("/:userId", async ({ params, set }) => {
			const userId = params.userId;
			const response = await getUserById(+userId);
			set.status = response.status;
			return response;
		})
		.post("/create", async ({ body, set }) => {
			const payload = body as TUser;
			const response = await createUser(payload);
			set.status = response.status;
			return response;
		})
		.get("/", async ({ query, set }) => {
			const username = query.username;
			const response = await getUserByUsername(username ?? "");
			set.status = response.status;
			return response;
		})
);

app.listen(PORT, async () => {
	console.log(`User service's running at ${app.server?.hostname}:${app.server?.port}`);
	try {
		await userDb.authenticate();
		console.log("Database connected successfully.");
	} catch (error: any) {
		console.error("Unable to connect to the database:", error.message);
	}
});

