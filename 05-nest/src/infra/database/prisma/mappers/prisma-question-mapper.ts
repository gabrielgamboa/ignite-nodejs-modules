import { Id } from "@/core/entities/id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Question as PrismaQuestion } from "@prisma/client";

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new Id(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new Id(raw.id),
    );
  }
}
