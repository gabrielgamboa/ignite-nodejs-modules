import { expect, describe, afterAll, beforeAll, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Authenticate (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "XbW9z@example.com",
      password: "123456",
    });

    const authenticateResponse = await request(app.server)
      .post("/session")
      .send({
        email: "XbW9z@example.com",
        password: "123456",
      });

    const userInfo = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${authenticateResponse.body.token}`);

    expect(userInfo.statusCode).toEqual(200);
    expect(userInfo.body.user).toEqual(
      expect.objectContaining({
        email: "XbW9z@example.com",
      })
    );
  });
});
