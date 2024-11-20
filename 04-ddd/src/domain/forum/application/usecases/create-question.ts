import { Either, right } from "@/core/either";
import { Id } from "../../../../core/entities/id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
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
    attachmentsIds
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new Id(authorId),
      content,
      title,
    });

    const questionAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new Id(attachmentId),
        questionId: question.id,
      })
    });

    question.attachments = questionAttachments;


    await this.questionsRepository.create(question);

    return right({ question })
  }
}
