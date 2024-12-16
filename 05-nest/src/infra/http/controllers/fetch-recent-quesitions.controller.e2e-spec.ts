import { PrismaService } from "../../database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { JwtService } from "@nestjs/jwt";
import { AppModule } from "@/infra/app.module";

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

    await prisma.question.createMany({
      data: [
        {
          authorId: user.id,
          title: "New question 1",
          content: "New content",
          slug: "new-question-1",
        },
        {
          authorId: user.id,
          title: "New question 2",
          content: "New content",
          slug: "new-question-2",
        },
        {
          authorId: user.id,
          title: "New question 3",
          content: "New content",
          slug: "new-question-3",
        },
      ],
    });

    const token = jwt.sign({ sub: user.id });

    const response = await request(app.getHttpServer())
      .get("/questions")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.questions).toHaveLength(3);
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: "New question 1" }),
        expect.objectContaining({ title: "New question 2" }),
        expect.objectContaining({ title: "New question 3" }),
      ],
    });
  });
});
