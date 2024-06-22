import { prisma } from "@/infra/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { hash, compare } from 'bcryptjs';
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, name, password } = createUserSchema.parse(request.body);

    const userAlreadyExistsWithSameEmail = await prisma.user.findUnique({
        where: { email }
    });

    if (userAlreadyExistsWithSameEmail) return reply.status(409).send();

    const passwordHash = await hash(password, 6);

    await prisma.user.create({
        data: {
            email,
            name,
            password_hash: password
        }
    })

    return reply.status(201).send();
}
