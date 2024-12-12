import { PrismaService } from "../prisma/prisma.service";
import { AppModule } from "../app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { hash } from "bcryptjs";

describe("Authenticate (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test("[POST] /sessions", async () => {
    await prisma.user.create({
      data: {
        name: "Jonh Doe",
        email: "jonh.doe@example.com",
        password: await hash("123456", 8),
      },
    });

    const response = await request(app.getHttpServer()).post("/sessions").send({
      email: "jonh.doe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
