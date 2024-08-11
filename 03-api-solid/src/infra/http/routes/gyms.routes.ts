import { verifyJwt } from "@/infra/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "@/infra/http/controllers/gyms/create";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms", create);
}
