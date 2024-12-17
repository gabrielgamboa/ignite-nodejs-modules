import { Id } from "@/core/entities/id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Question as PrismaQuestion, Prisma } from "@prisma/client";

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

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      authorId: question.authorId.toString(),
      id: question.id.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      content: question.content,
      slug: question.slug.value,
      title: question.title,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}
