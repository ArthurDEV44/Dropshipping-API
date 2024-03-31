import { FastifyInstance } from 'fastify';
import HistoriquesCommandesController from './historiques_commandes_controller';

export default async function historiquesCommandesRoutes(fastify: FastifyInstance) {
  const historiquesCommandesController = new HistoriquesCommandesController(fastify);

  fastify.get('/commandes/historique', async (request, reply) => {
    return historiquesCommandesController.getCommandesUtilisateur(request, reply);
  });
}
