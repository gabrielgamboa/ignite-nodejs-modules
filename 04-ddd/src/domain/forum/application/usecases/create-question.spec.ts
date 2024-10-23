import { InMemoryQuestionsRepository } from 'test/repositories/questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: QuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('create an Question', async () => {
    const { question } = await sut.execute({
      title: 'Nova Pergunta',
      content: 'Nova Resposta',
      authorId: '1',
    })

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual('nova-pergunta')
  })
})
