import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("create an answer", async () => {
    const response = await sut.execute({
      content: "Nova Resposta",
      questionId: "1",
      instructorId: "1",
    });

    expect(response.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(response.value?.answer);
  });
});
