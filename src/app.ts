import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifySwagger from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import { fastify } from 'fastify';
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { routes } from './routes';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // credentials: true,
});

app.register(fastifyMultipart, { limits: { fileSize: 5 * 1024 * 1024 } });

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

// Rotas registradas depois do swagger para aparecerem na documentação
app.register(routes);

export { app };
