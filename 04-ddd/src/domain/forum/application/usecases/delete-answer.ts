import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) { }

  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest) {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) throw new Error("Answer not found");

    if (answer.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    await this.answersRepository.delete(answer);

    return {};
  }
}
