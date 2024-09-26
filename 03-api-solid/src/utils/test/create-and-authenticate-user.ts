import { prisma } from "@/infra/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "XbW9z@example.com",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authenticateResponse = await request(app.server).post("/session").send({
    email: "XbW9z@example.com",
    password: "123456",
  });

  const { token } = authenticateResponse.body;

  return { token };
}
