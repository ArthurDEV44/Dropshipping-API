import fastify from 'fastify';
import routes from './routes';
import { AddressInfo } from 'net'; // Importez AddressInfo pour la vérification de type
import fastifyRedis from '@fastify/redis';
import dotenv from 'dotenv';
dotenv.config();

const server = fastify();

server.register(routes);

server.register(fastifyRedis, {
    host: '127.0.0.1', // L'adresse du serveur Redis
});

const start = async () => {
    try {
        await server.listen({ port: 8080 });
        // Utilisez une assertion de type pour traiter server.server.address() comme AddressInfo
        const address = server.server.address() as AddressInfo;
        // Vérifiez si address est un string (écoute sur un pipe/socket) ou un objet (TCP)
        const port = typeof address === 'string' ? address : address?.port;
        console.log(`Server listening on ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
