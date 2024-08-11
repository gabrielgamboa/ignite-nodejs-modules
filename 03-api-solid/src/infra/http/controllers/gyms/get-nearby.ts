import { makeGetNearbyGymsUseCase } from "@/usecases/factories/make-get-nearby-gyms-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getNearby(request: FastifyRequest, reply: FastifyReply) {
  const getNearbySchema = z.object({
    page: z.number().min(1).default(1),
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    userLogitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { page, userLatitude, userLogitude } = getNearbySchema.parse(
    request.query
  );

  const createGymUseCase = makeGetNearbyGymsUseCase();

  const { gyms } = await createGymUseCase.execute({
    page,
    userLatitude,
    userLogitude,
  });

  return reply.status(201).send({ gyms });
}
