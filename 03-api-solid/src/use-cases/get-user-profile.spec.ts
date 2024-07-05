import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFound } from './errors/resource-not-found';


let usersRepository: UsersRepository;
let sut: GetUserProfileUseCase;

describe('AuthenticateUseCase', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepository);
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            email: 'test@email.com',
            password_hash: await hash('1234', 6),
            name: 'test',
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        });

        expect(user.id).toBeDefined();
        expect(user.id).toEqual(expect.any(String))
    });

    it('should not be able to get user profile with wrong id', async () => {
        expect(() => sut.execute({
            userId: 'any_id',
        })).rejects.toBeInstanceOf(ResourceNotFound)
    });
})