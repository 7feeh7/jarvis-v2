import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import { fastify } from 'fastify';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

const app = fastify();

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // credentials: true,
});

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Template API Fastify',
            description: 'Template simples para API Fastify',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, {
    routePrefix: '/docs',
});

export { app };
