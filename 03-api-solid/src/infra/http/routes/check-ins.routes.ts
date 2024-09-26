import { verifyJWT } from "@/infra/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { validateCheckIn } from "../controllers/check-ins/validate";
import { getMetrics } from "../controllers/check-ins/metrics";
import { history } from "../controllers/check-ins/history";
import { createCheckIn } from "../controllers/check-ins/create";
import { verifyUserRole } from "@/infra/middlewares/verify-role";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/:gymId", createCheckIn);
  app.patch(
    "/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validateCheckIn
  );
  app.get("/metrics", getMetrics);
  app.get("/history", history);
}
