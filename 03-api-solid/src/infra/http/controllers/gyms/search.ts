import { makeGetGymsUseCase } from "@/usecases/factories/make-get-gyms-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const createGymSchema = z.object({
    page: z.number().min(1).default(1),
    query: z.string(),
  });

  const { page, query } = createGymSchema.parse(request.query);

  const createGymUseCase = makeGetGymsUseCase();

  const { gyms } = await createGymUseCase.execute({
    page,
    query,
  });

  return reply.status(201).send({ gyms });
}
