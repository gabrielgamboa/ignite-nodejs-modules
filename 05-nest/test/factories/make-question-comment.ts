import { Id } from "@/core/entities/id";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { faker } from "@faker-js/faker";

export const makeQuestionComment = (
  override: Partial<QuestionComment> = {},
  id?: Id,
): QuestionComment => {
  return QuestionComment.create(
    {
      authorId: new Id(),
      questionId: new Id(),
      content: faker.lorem.sentence(),
      ...override,
    },
    id,
  );
};
