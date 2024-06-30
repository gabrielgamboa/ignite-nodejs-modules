import { hash } from 'bcryptjs';
import { prisma } from '../infra/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (user) throw new UserAlreadyExistsError();

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({ email, name, password_hash })
  }
}