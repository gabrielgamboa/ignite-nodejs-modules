import { expect, describe, afterAll, beforeAll, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/infra/prisma";

describe("Create CheckIn (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a checkin", async () => {
    const gym = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: "11999999999",
        description: "Some description.",
      },
    });

    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post(`/check-ins/${gym.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
