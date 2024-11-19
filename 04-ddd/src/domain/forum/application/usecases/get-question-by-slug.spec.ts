import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryQuestionsRepository: QuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const questionCreated = makeQuestion();

    await inMemoryQuestionsRepository.create(questionCreated);

    const result = await sut.execute({
      slug: "nova-pergunta",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: questionCreated.title
      })
    })
  });

  it("should not be able to get a question by slug if does not exists", async () => {
    const result = await sut.execute({ slug: "nova-pergunta" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  });
});
