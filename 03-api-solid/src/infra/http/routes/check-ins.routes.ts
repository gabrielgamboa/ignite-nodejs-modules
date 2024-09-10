import { verifyJWT } from "@/infra/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { validateCheckIn } from "../controllers/check-ins/validate";
import { getMetrics } from "../controllers/check-ins/metrics";
import { history } from "../controllers/check-ins/history";
import { createCheckIn } from "../controllers/check-ins/create";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/:gymId", createCheckIn);
  app.patch("/:checkInId/validate", validateCheckIn);
  app.get("/metrics", getMetrics);
  app.get("/history", history);
}
