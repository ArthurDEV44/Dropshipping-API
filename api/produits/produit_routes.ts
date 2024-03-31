import { FastifyInstance } from 'fastify';
import ProduitController from './produit_controller';

export default async function produitRoutes(fastify: FastifyInstance) {
    const produitController = new ProduitController(fastify);

    fastify.get('/api/v1/produits', async (request, reply) => produitController.listAll(request, reply));
    fastify.post('/api/v1/produit', async (request, reply) => produitController.addProduit(request, reply));
    fastify.put('/api/v1/produit/:id', async (request, reply) => produitController.updateProduit(request, reply));
    fastify.delete('/api/v1/produit/:id', async (request, reply) => produitController.deleteProduit(request, reply));
    fastify.get('/api/v1/produit/:id', async (request, reply) => produitController.getProduitById(request, reply));
}
