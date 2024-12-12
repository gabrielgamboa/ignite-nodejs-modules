import { InMemoryQuestionsCommentsRepository } from "test/repositories/in-memory-questions-comments-repository";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { Id } from "@/core/entities/id";

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe("Fetch Question Comments", () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository =
      new InMemoryQuestionsCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionsCommentsRepository);
  });

  it("should be able to fetch question from a comment", async () => {
    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({ questionId: new Id("question-1") }),
    );

    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({ questionId: new Id("question-1") }),
    );

    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({ questionId: new Id("question-1") }),
    );

    const result = await sut.execute({ page: 1, questionId: "question-1" });

    expect(result.value?.questionComments).toHaveLength(3);
  });

  it("should be able to fetch paginated question comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsCommentsRepository.create(
        makeQuestionComment({ questionId: new Id("question-1") }),
      );
    }

    const result = await sut.execute({ page: 2, questionId: "question-1" });

    expect(result.value?.questionComments).toHaveLength(2);
  });
});
