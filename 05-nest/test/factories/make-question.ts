import { faker } from "@faker-js/faker";
import { Id } from "@/core/entities/id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export const makeQuestion = (
  override: Partial<QuestionProps> = {},
  id?: Id,
) => {
  return Question.create(
    {
      authorId: new Id("1"),
      content: faker.lorem.sentence(),
      title: faker.lorem.text(),
      slug: new Slug("nova-pergunta"),
      createdAt: new Date(),
      ...override,
    },
    id,
  );
};
