import { hash } from 'bcryptjs';
import { prisma } from '../infra/prisma';

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

  const passwordHash = await hash(password, 6);

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash: password
    }
  })
}