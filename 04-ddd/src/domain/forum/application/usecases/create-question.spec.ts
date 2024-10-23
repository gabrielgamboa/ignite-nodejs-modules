import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: function (question: Question): Promise<void> {
    return Promise.resolve()
  },
}

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)
  const response = await createQuestion.execute({
    authorId: '1',
    title: 'Nova Pergunta',
    content: 'Novo conteúdo',
  })

  expect(response.question.id).toBeTruthy()
  expect(response.question.slug.value).toEqual('nova-pergunta')
})
