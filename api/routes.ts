import { FastifyInstance } from 'fastify';
import produitRoutes from './produits/produit_routes';

export default async function routes(fastify: FastifyInstance) {
    fastify.register(produitRoutes);
}
