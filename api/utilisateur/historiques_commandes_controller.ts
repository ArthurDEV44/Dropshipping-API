import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import HistoriquesCommandesService from './historiques_commandes_services';

export default class HistoriquesCommandesController {
  private historiquesCommandesService: HistoriquesCommandesService;

  constructor(fastify: FastifyInstance) {
    this.historiquesCommandesService = new HistoriquesCommandesService();
  }

  public async getCommandesUtilisateur(request: FastifyRequest, reply: FastifyReply) {
    try {
      const utilisateurId = request.user?.id;
      if (typeof utilisateurId !== 'number') {
        return reply.status(400).send({ error: 'Identifiant utilisateur invalide' });
      }

      const commandes = await this.historiquesCommandesService.getCommandesUtilisateur(utilisateurId);
      
      return reply.status(200).send(commandes);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Erreur lors de la récupération de l\'historique des commandes' });
    }
  }
}
