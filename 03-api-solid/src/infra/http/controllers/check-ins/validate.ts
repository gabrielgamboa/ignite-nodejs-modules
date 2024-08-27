import { z } from "zod";
import { makeValidateCheckInUseCase } from "@/usecases/factories/make-validate-checkin-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function validateCheckIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const validateCheckInSchema = z.object({
    checkInId: z.string(),
  });

  const { checkInId } = validateCheckInSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();
  const { checkIn } = await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(200).send({ checkIn });
}
