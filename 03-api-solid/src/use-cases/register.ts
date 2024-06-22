import { hash } from 'bcryptjs';
import { prisma } from '../infra/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({ email, name, password }: RegisterUseCaseRequest) {
  const userAlreadyExistsWithSameEmail = await prisma.user.findUnique({
    where: { email }
  });

  if (userAlreadyExistsWithSameEmail) throw new Error('User already exists with this email');

  const password_hash = await hash(password, 6);

  const prismaUsersRepository = new PrismaUsersRepository();
  await prismaUsersRepository.create({ email, name, password_hash })
}