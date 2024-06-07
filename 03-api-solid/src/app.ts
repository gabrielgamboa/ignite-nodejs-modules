import fastify from "fastify";
import z from 'zod';
import { prisma } from "./infra/prisma";

const app = fastify();



app.post('/users', async (request, reply) => {
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, name, password } = createUserSchema.parse(request.body);

    await prisma.user.create({
        data: { 
            email,
            name,
            password_hash: password 
        }
    })

    return reply.status(201).send();
})

export { app }