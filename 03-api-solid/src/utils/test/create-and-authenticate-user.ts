import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "John Doe",
    email: "XbW9z@example.com",
    password: "123456",
  });

  const authenticateResponse = await request(app.server).post("/session").send({
    email: "XbW9z@example.com",
    password: "123456",
  });

  const { token } = authenticateResponse.body;

  return { token };
}
