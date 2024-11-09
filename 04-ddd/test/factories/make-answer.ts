import { faker } from '@faker-js/faker'
import { Id } from '@/core/entities/id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'

export const makeAnswer = (override: Partial<AnswerProps> = {}, id?: Id) => {
  return Answer.create(
    {
      authorId: new Id('1'),
      content: faker.lorem.sentence(),
      questionId: new Id('1'),
      createdAt: new Date(),
      ...override,
    },
    id,
  )
}
