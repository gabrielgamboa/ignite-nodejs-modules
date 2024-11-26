import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/questions-repository";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { Id } from "@/core/entities/id";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) { }

  async execute({
    questionId,
    authorId,
    content,
    title,
    attachmentsIds
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) return left(new ResourceNotFoundError())

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const currentAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId);

    const questionAttachmentsList = new QuestionAttachmentList(currentAttachments);

    const questionAttachments = attachmentsIds.map(attachmentsId => {
      return QuestionAttachment.create({
        attachmentId: new Id(attachmentsId),
        questionId: new Id(questionId),
      })
    })

    questionAttachmentsList.update(questionAttachments);

    question.title = title;
    question.content = content;
    question.attachments = questionAttachmentsList;


    await this.questionsRepository.save(question);

    return right({})
  }
}
