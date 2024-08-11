import { beforeEach, describe, expect, it, test } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { UsersRepository } from "@/repositories/users-repository";

let usersRepository: UsersRepository;
let sut: RegisterUseCase;

describe("RegisterUseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register user in system", async () => {
    const { user } = await sut.execute({
      name: "Test",
      email: "test@gmail.com",
      password: "1234",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Test",
      email: "test@gmail.com",
      password: "1234",
    });

    const isSamePassword = await compare("1234", user.password_hash);

    expect(isSamePassword).toBeTruthy();
  });

  it.only("throws if user email already exists", async () => {
    await sut.execute({
      name: "Test",
      email: "test@gmail.com",
      password: "1234",
    });

    await expect(() =>
      sut.execute({
        name: "Test",
        email: "test@gmail.com",
        password: "1234",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
