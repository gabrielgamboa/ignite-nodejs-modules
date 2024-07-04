import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository';


let checkInRepository: CheckInsRepository;
let sut: CheckInUseCase;

describe('AuthenticateUseCase', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(checkInRepository);
    })

    it('should be able to create a check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym_id',
            userId: 'user_id',
        });

        expect(checkIn.id).toBeDefined();
        expect(checkIn.id).toEqual(expect.any(String))
    });
})