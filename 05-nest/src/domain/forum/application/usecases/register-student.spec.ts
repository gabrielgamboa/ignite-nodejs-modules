import { Id } from "@/core/entities/id";
import { RegisterStudentUseCase } from "./register-student";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let sut: RegisterStudentUseCase;

describe("Register Student", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher);
  });

  it("should be able to register a student", async () => {
    const response = await sut.execute({
      email: "fake-email@gmail.com",
      name: "Gabriel",
      password: "123456",
    });

    expect(response.isRight()).toBeTruthy();
    // expect(response.value?.id).toBeTruthy();
    // expect(response.value?.question.slug.value).toEqual("nova-pergunta");
  });

  // it("should not be able to register a student if email already registered", async () => {
  //   const response = await sut.execute({
  //     title: "Nova Pergunta",
  //     content: "Nova Resposta",
  //     authorId: "1",
  //     attachmentsIds: ["1", "2"],
  //   });

  //   expect(response.isRight()).toBeTruthy();
  //   expect(response.value?.question.id).toBeTruthy();
  //   expect(response.value?.question.attachments.currentItems).toHaveLength(2);
  //   expect(response.value?.question.attachments.currentItems).toEqual([
  //     expect.objectContaining({ attachmentId: new Id("1") }),
  //     expect.objectContaining({ attachmentId: new Id("2") }),
  //   ]);
  // });
});
