import { Id } from "../../../../core/entities/id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  instructorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: new Id(instructorId),
      questionId: new Id(questionId),
      content,
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
