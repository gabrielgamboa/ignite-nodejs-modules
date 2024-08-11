import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/usecases/factories/make-register-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = createUserSchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({ email, name, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError)
      return reply.status(409).send({ message: err.message });

    throw err;
  }

  return reply.status(201).send();
}
