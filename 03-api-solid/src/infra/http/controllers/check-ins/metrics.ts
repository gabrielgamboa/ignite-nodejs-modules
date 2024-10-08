import { makeGetUserMetricsUseCase } from "@/usecases/factories/make-get-user-metrics-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getMetrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
