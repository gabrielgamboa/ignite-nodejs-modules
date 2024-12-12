import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";

interface ChooseBestQuestionAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

type ChooseBestQuestionAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;
export class ChooseBestQuestionAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseBestQuestionAnswerUseCaseRequest): Promise<ChooseBestQuestionAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) return left(new ResourceNotFoundError());

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return right({ question });
  }
}
