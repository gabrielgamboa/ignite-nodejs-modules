import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper";

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prismaService: PrismaService) { }

  create(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prismaService.question.findUnique({
      where: { id },
    });

    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error("Method not impleme-nted.");
  }

  delete(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }

  save(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
