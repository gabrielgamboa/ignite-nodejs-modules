import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { AnswerAttachmentsRepository } from "../repositories/answer-attachments-repository";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { Id } from "@/core/entities/id";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
  attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    const currentAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const answerAttachmentsList = new AnswerAttachmentList(currentAttachments);

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new Id(attachmentId),
        answerId: new Id(answerId),
      });
    });

    answerAttachmentsList.update(questionAttachments);

    answer.content = content;
    answer.attachments = answerAttachmentsList;

    await this.answersRepository.save(answer);

    return right({
      answer,
    });
  }
}
