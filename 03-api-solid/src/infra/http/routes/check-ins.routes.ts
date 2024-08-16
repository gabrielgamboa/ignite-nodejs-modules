import { verifyJWT } from "@/infra/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { validateCheckIn } from "../controllers/check-ins/validate";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/validate", validateCheckIn);
}
