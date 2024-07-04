import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository';


let checkInRepository: CheckInsRepository;
let sut: CheckInUseCase;

describe('AuthenticateUseCase', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(checkInRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to create a check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym_id',
            userId: 'user_id',
        });

        expect(checkIn.id).toBeDefined();
        expect(checkIn.id).toEqual(expect.any(String))
    });

    it('should not be able to check in twice in the same date', async () => {
        vi.setSystemTime(new Date(2022,0,20,8,0,0))

        await sut.execute({
            gymId: 'gym_id',
            userId: 'user_id',
        });

        await expect(() => sut.execute({
            gymId: 'gym_id',
            userId: 'user_id',
        })).rejects.toBeInstanceOf(Error)
    });

    it('should be able to check in twice in differente days', async () => {
        vi.setSystemTime(new Date(2022,0,20,8,0,0))

        await sut.execute({
            gymId: 'gym_id',
            userId: 'user_id',
        });

        vi.setSystemTime(new Date(2022,0,21,8,0,0))

        const { checkIn } = await sut.execute({
            gymId: 'gym_id',
            userId: 'user_id',
        });

        expect(checkIn.id).toBeDefined();
        expect(checkIn.id).toEqual(expect.any(String))
    });
})