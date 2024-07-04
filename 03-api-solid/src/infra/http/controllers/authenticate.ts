import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateUserSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateUserSchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        await authenticateUseCase.execute({ email, password });
    } catch (err) {
        if (err instanceof InvalidCredentialsError) return reply.status(400).send({ message: err.message });
        throw err
    }

    return reply.status(200).send();
}