import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { makeStudent } from "test/factories/make-student";
import { AuthenticateStudentUseCase } from "./authenticate-student";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateStudentUseCase;

describe("Authenticate Student", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticateStudentUseCase(inMemoryStudentsRepository, fakeHasher, fakeEncrypter);
  });

  it("should be able to authenticate a student", async () => {
    const student = makeStudent({
      email: "fake-email@gmail.com",
      password: await fakeHasher.hash("123456"),
    });

    inMemoryStudentsRepository.create(student);

    const response = await sut.execute({
      email: "fake-email@gmail.com",
      password: "123456",
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toEqual({
      accessToken: expect.any(String)
    });
  });
});