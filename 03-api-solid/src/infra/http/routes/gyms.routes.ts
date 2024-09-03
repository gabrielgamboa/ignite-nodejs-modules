import { verifyJWT } from "@/infra/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "@/infra/http/controllers/gyms/create";
import { search } from "../controllers/gyms/search";
import { getNearby } from "../controllers/gyms/get-nearby";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/", create);
  app.get("/search", search);
  app.get("/nearby", getNearby);
}
