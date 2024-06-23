import { hash } from 'bcryptjs';
import { prisma } from '../infra/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UsersRepository } from '@/repositories/users-repository';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async registerUseCase({ email, name, password }: RegisterUseCaseRequest) {
    const userAlreadyExistsWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userAlreadyExistsWithSameEmail) throw new Error('User already exists with this email');

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({ email, name, password_hash })
  }
}