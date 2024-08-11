import { FastifyInstance } from "fastify";
import { register } from "../controllers/users/register";
import { authenticate } from "../controllers/auth/authenticate";
import { profile } from "../controllers/users/profile";
import { verifyJwt } from "../../middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/session", authenticate);

  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
