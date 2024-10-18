import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question';

test('create an answer', () => {
  const createAnswerUseCase = new AnswerQuestionUseCase();
  const response = createAnswerUseCase.execute({ content: 'Nova Resposta', questionId: '1', instructorId: '1' });

  expect(response.content).toEqual('Nova Resposta');
})