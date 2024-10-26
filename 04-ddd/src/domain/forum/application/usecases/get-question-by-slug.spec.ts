import { InMemoryQuestionsRepository } from 'test/repositories/questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Id } from '@/core/entities/id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: QuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const questionCreated = new Question({
      authorId: new Id('1'),
      content: 'Nova Pergunta',
      title: 'Nova Pergunta',
      slug: new Slug('nova-pergunta'),
      createdAt: new Date()
    })

    await inMemoryQuestionsRepository.create(questionCreated);
    
    const { question } = await sut.execute({
      slug: 'nova-pergunta'
    });

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual('nova-pergunta')
  })

  it('should not be able to get a question by slug if does not exists', async () => {
    expect(async () => {
      await sut.execute({ slug: 'nova-pergunta'})
    }).rejects.toThrowError();
  })
})
