import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { UsersRepository } from '@/repositories/users-repository';

let usersRepository: UsersRepository;
let sut: AuthenticateUseCase;

describe('AuthenticateUseCase', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    })

    it('should be able to authenticate user', async () => {
        await usersRepository.create({
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
        await usersRepository.create({
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
        await usersRepository.create({
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