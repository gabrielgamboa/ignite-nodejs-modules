import { InMemoryAnswersCommentsRepository } from "test/repositories/in-memory-answers-comments-repository";
import { Id } from "@/core/entities/id";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe("Fetch Answer Comments", () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswersCommentsRepository);
  });

  it("should be able to fetch answers from a answer", async () => {
    await inMemoryAnswersCommentsRepository.create(
      makeAnswerComment({ answerId: new Id('answers-1') }),
    );

    await inMemoryAnswersCommentsRepository.create(
      makeAnswerComment({ answerId: new Id('answers-1') }),
    );

    await inMemoryAnswersCommentsRepository.create(
      makeAnswerComment({ answerId: new Id('answers-1') }),
    );

    const result = await sut.execute({ page: 1, answerId: 'answers-1' });

    expect(result.value?.answerComments).toHaveLength(3);
  });

  it("should be able to fetch paginated answers comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersCommentsRepository.create(makeAnswerComment({ answerId: new Id('answers-1') }));
    }

    const result = await sut.execute({ page: 2, answerId: 'answers-1' });

    expect(result.value?.answerComments).toHaveLength(2);
  });
});
