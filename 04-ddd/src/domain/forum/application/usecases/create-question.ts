import { Either, right } from "@/core/either";
import { Id } from "../../../../core/entities/id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<null, {
  question: Question
}>

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) { }

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new Id(authorId),
      content,
      title,
    });

    await this.questionsRepository.create(question);

    return right({ question })
  }
}
