import { Id } from "@/core/entities/id";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { faker } from "@faker-js/faker";

export const makeAnswerComment = (
  override: Partial<AnswerComment> = {},
  id?: Id,
): AnswerComment => {
  return AnswerComment.create(
    {
      authorId: new Id(),
      answerId: new Id(),
      content: faker.lorem.sentence(),
      ...override,
    },
    id,
  );
};
