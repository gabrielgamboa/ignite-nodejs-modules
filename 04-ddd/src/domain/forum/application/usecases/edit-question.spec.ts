import { InMemoryQuestionsRepository } from "test/repositories/questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { Id } from "@/core/entities/id";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const question = makeQuestion(
      {
        authorId: new Id("1"),
      },
      new Id("question-1"),
    );

    inMemoryQuestionsRepository.create(question);

    console.log(inMemoryQuestionsRepository.items);

    await sut.execute({
      authorId: "1",
      questionId: question.id.toString(),
      title: "Example title",
      content: "Example content",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Example title",
      content: "Example content",
    });
  });

  it("should not be able to delete a question if question does not exists", async () => {
    expect(async () => {
      await sut.execute({
        authorId: "1",
        questionId: "id",
        title: "Example title",
        content: "Example content",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to delete a question if author does not match ", async () => {
    inMemoryQuestionsRepository.create(
      makeQuestion(
        {
          authorId: new Id("1"),
        },
        new Id("question-1"),
      ),
    );

    expect(async () => {
      await sut.execute({
        authorId: "12",
        questionId: "id",
        title: "Example title",
        content: "Example content",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
