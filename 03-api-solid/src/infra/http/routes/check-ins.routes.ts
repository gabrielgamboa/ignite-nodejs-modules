import { verifyJWT } from "@/infra/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
}
