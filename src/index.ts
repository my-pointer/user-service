import { Elysia } from "elysia";
import userDb from "./db/connection";
import { createUser } from "./services/userService";
import { TUser } from "./interfaces/user";

const app = new Elysia();
const PORT: any = process.env.PORT;

app.group("/api/v1/user", (router) =>
	router
		.get("/", () => "Hello user service")
		.get("/:userId", ({ params }) => {
			const userId = params.userId;
			return { userId };
		})
		.post("/create", async ({ body, set }) => {
			const payload = body as TUser;
			const response = await createUser(payload);
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

