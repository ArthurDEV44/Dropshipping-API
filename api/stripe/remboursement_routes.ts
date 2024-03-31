import { FastifyInstance } from 'fastify';
import RemboursementController from './remboursement_controller'; // Assure-toi que le chemin est correct

export default async function remboursementRoutes(fastify: FastifyInstance) {
    // Crée une instance de ton contrôleur
    const remboursementController = new RemboursementController(fastify);
  
    // Route pour effectuer un remboursement
    fastify.post('/api/v1/remboursements', async (request, reply) => {
      return remboursementController.effectuerRemboursement(request, reply);
    });
}
  