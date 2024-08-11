import { FastifyInstance } from "fastify";
import { usersRoutes } from "./users.routes";
import { gymsRoutes } from "./gyms.routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes);
  app.register(gymsRoutes);
}
