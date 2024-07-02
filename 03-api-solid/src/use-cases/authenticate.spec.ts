import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('AuthenticateUseCase', () => {
    it('should be able to authenticate user', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(userRepository);

        await userRepository.create({
            email: 'test@email.com',
            password_hash: await hash('1234', 6),
            name: 'test',
        })

        const { user } = await sut.execute({
            email: 'test@email.com',
            password: '1234'
        });

        expect(user.id).toBeDefined();
        expect(user.id).toEqual(expect.any(String))
    });

    it('should not be able to authenticate user with invalid email', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(userRepository);

        await userRepository.create({
            email: 'test@email.com',
            password_hash: await hash('1234', 6),
            name: 'test',
        })

        expect(() => sut.execute({
            email: 'test2@email.com',
            password: '1234'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    });

    it('should not be able to authenticate user with invalid password', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(userRepository);

        await userRepository.create({
            email: 'test@email.com',
            password_hash: await hash('1234', 6),
            name: 'test',
        })

        expect(() => sut.execute({
            email: 'test@email.com',
            password: '12345'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})