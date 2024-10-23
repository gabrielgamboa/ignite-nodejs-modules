import { AnswerQuestionUseCase } from './answer-question';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '@/domain/entities/answer';

const fakeAnswersRepository: AnswersRepository = {
  create: function (answer: Answer): Promise<void> {
    return Promise.resolve();
  }
}

test('create an answer', async () => {
  const createAnswerUseCase = new AnswerQuestionUseCase(fakeAnswersRepository);
  const response = await createAnswerUseCase.execute({ content: 'Nova Resposta', questionId: '1', instructorId: '1' });

  expect(response.content).toEqual('Nova Resposta');
})