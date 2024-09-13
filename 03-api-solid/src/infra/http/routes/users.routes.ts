import { FastifyInstance } from "fastify";
import { register } from "../controllers/users/register";
import { profile } from "../controllers/users/profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { authenticate } from "../controllers/users/authenticate";
import { refresh } from "../controllers/users/refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/session", authenticate);
  app.patch("/token/refresh", refresh);

  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
