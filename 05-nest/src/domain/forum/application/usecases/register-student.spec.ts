import { RegisterStudentUseCase } from "./register-student";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error";

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
  });

  it("should not be able to register a student if email already registered", async () => {
    await sut.execute({
      email: "fake-email@gmail.com",
      name: "Gabriel",
      password: "123456",
    });

    const response = await sut.execute({
      email: "fake-email@gmail.com",
      name: "Gabriel",
      password: "123456",
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(StudentAlreadyExistsError);
  });
});