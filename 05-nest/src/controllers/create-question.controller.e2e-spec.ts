import { PrismaService } from "../prisma/prisma.service";
import { AppModule } from "../app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { JwtService } from "@nestjs/jwt";

describe("Create Question (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test("[POST] /questions", async () => {
    const user = await prisma.user.create({
      data: {
        email: "gabriel@example.com",
        name: "Gabriel",
        password: "123123",
      },
    });

    const token = jwt.sign({ sub: user.id });

    const response = await request(app.getHttpServer())
      .post("/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "New question",
        content: "New content from question",
      });

    expect(response.statusCode).toBe(201);

    const questionOnDatabase = await prisma.question.findFirst({
      where: { title: "New question" },
    });

    expect(questionOnDatabase).toBeTruthy();
  });
});
