import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseBestQuestionAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseBestQuestionAnswerUseCaseResponse {
  question: Question;
}

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

    if (!answer) throw new Error("Answer not found");

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) throw new Error("Question not found");

    if (question.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return {
      question,
    };
  }
}
