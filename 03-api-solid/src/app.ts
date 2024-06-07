import fastify from "fastify";
import { appRoutes } from "./infra/http/routes";

const app = fastify();
app.register(appRoutes)

export { app }