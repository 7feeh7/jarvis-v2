import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { Ingest } from './ingest';

export const routes: FastifyPluginAsyncZod = async (fastify) => {
    fastify.post(
        '/ingest',
        {
            schema: {
                tags: ['ingest'],
                summary: 'Ingestão de conhecimento no formato .txt',
                consumes: ['multipart/form-data'],
                response: {
                    201: z.object({ message: z.string() }),
                    400: z.object({ message: z.string() }),
                    413: z.object({ message: z.string() }),
                },
            },
        },
        async (request, reply) => {
            const data: any = await request.file();

            const ingest = new Ingest(data);
            console.log(ingest);

            return reply.code(201).send({
                message: 'Arquivo recebido com sucesso.',
            });
        },
    );
};
