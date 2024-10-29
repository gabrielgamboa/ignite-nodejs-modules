import { Id } from "@/core/entities/id"
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question"
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug"

export const makeQuestion = (oveerride: Partial<QuestionProps> = {}) => {
  return Question.create({
      authorId: new Id('1'),
      content: 'Nova Pergunta',
      title: 'Nova Pergunta',
      slug: new Slug('nova-pergunta'),
      createdAt: new Date(),
      ...oveerride,
  })
}