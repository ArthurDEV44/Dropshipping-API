import { FastifyInstance } from 'fastify';
import AchatController from './achat_controller';

export default async function achatRoutes(fastify: FastifyInstance) {
  const achatController = new AchatController(fastify);

  fastify.post('/api/v1/achats/produit', async (request, reply) => {
    return achatController.acheterProduit(request, reply);
  });
}
