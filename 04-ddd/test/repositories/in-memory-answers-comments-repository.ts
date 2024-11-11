import { AnswersCommentsRepository } from "@/domain/forum/application/repositories/answers-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryAnswersCommentsRepository implements AnswersCommentsRepository {
  public items: AnswerComment[] = [];

  async create(AnswerComment: AnswerComment): Promise<void> {
    this.items.push(AnswerComment)
  }
}