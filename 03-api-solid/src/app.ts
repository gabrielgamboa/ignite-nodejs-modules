import fastify from "fastify";
import { appRoutes } from "./infra/http/routes/routes";
import { ZodError } from "zod";
import { env } from "./env";
import jwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(jwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(appRoutes);

app.setErrorHandler((err, request, reply) => {
  if (err instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation Error", issues: err.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(err);
  } else {
    // todo: add external logsssad
  }

  return reply.status(500).send({ message: "Internal Server Error" });
});
