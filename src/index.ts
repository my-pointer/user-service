import { Elysia } from "elysia";

const app = new Elysia();
const PORT = process.env.PORT;

app.group("/api/v1/user", (router) =>
	router
		.get("/", () => "Hello user service")
		.get("/:userId", ({ params }) => {
			const userId = params.userId;
			return { userId };
		})
);

app.listen(PORT);

console.log(`User service's running at ${app.server?.hostname}:${app.server?.port}`);

