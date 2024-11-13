import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '../repositories/questions-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string,
  page: number
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private readonly questionsCommentsRepository: QuestionsCommentsRepository) { }

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionsCommentsRepository.findManyByQuestionId(questionId, { page })

    return { questionComments }
  }
}
