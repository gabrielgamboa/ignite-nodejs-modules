import { makeGetUserCheckInHistoryUseCase } from "@/usecases/factories/make-get-user-check-in-history-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const getUserCheckInHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getUserCheckInHistorySchema.parse(request.query);

  const getCheckinHistoryUseCase = makeGetUserCheckInHistoryUseCase();
  const { checkIns } = await getCheckinHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
