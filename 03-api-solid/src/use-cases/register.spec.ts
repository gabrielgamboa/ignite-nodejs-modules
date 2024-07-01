import { describe, expect, it, test} from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('RegisterUseCase', () => {

    it('should be able to register user in system', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new RegisterUseCase(userRepository);

        const { user } = await sut.execute({
            name: 'Test',
            email: 'test@gmail.com',
            password: '1234'
        });

        expect(user.id).toBe(expect.any(String))

    })

    it('should hash user password upon registration', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new RegisterUseCase(userRepository);

        const { user } = await sut.execute({
            name: 'Test',
            email: 'test@gmail.com',
            password: '1234'
        });

        const isSamePassword = await compare('1234', user.password_hash);

        expect(isSamePassword).toBeTruthy();
    })

    it('throws if user email already exists', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new RegisterUseCase(userRepository);

        const { user } = await sut.execute({
            name: 'Test',
            email: 'test@gmail.com',
            password: '1234'
        });

        const promise = sut.execute({
            name: 'Test',
            email: 'test@gmail.com',
            password: '1234'
        });

        expect(promise).rejects.toThrow();
        expect(promise).rejects.toBeInstanceOf(UserAlreadyExistsError);
    })
})