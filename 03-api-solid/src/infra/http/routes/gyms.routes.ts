import { verifyJWT } from "@/infra/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "@/infra/http/controllers/gyms/create";
import { search } from "../controllers/gyms/search";
import { getNearby } from "../controllers/gyms/get-nearby";
import { verifyUserRole } from "@/infra/middlewares/verify-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/", { onRequest: [verifyUserRole("ADMIN")] }, create);
  app.get("/search", search);
  app.get("/nearby", getNearby);
}
