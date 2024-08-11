import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

type AuthenticateUserReponse = {
  user: User;
};

export class AuthenticateUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    data: AuthenticateUserRequest
  ): Promise<AuthenticateUserReponse> {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const doesPasswordMatches = await compare(password, user.password_hash);
    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return { user };
  }
}
