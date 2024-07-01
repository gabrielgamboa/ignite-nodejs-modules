import fastify from "fastify";
import { appRoutes } from "./infra/http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();
app.register(appRoutes)

app.setErrorHandler((err, request, reply ) => {
    if (err instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation Error', issues: err.format() });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(err);
    } else {
        //todo: add external logsssad
    }

    return reply.status(500).send({ message: 'Internal Server Error' });
})
