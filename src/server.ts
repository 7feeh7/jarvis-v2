import { app } from './app';

const PORT = Number(process.env.PORT) || 3000;

async function main() {
    try {
        const host = await app.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`Server is running on ${host}`);
        console.log(`Docs available at: http://localhost:${PORT}/docs`);
    } catch (error) {
        console.error(error);
    }
}

main();
