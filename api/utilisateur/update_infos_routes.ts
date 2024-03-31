import { FastifyInstance } from 'fastify';
import UpdateInfosController from './update_infos_controller';

export default async function updateInfosRoutes(fastify: FastifyInstance) {
  const updateInfosController = new UpdateInfosController(fastify);

  // Mise à jour de l'adresse de livraison
  fastify.post('/update-address', async (request, reply) => {
    return updateInfosController.updateAddress(request, reply);
  });

  // Mise à jour du mot de passe
  fastify.post('/update-password', async (request, reply) => {
    return updateInfosController.updatePassword(request, reply);
  });
}
