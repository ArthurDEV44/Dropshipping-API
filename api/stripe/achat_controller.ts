import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import AchatService from './achat_services';

export default class AchatController {
  private achatService: AchatService;

  constructor(fastify: FastifyInstance) {
    this.achatService = new AchatService();
  }

  public async acheterProduit(request: FastifyRequest, reply: FastifyReply) {
    try {
      const utilisateurId = request.user?.id;
      const { produitId, paymentIntentId } = request.body as any;
      
      if (!produitId) {
        return reply.status(400).send({ error: 'ID du produit requis' });
      }
  
      if (!utilisateurId) {
        return reply.status(400).send({ error: 'Utilisateur non identifié' });
      }

      if (!paymentIntentId) {
        return reply.status(400).send({ error: 'ID de l\'intention de paiement requis' });
      }

      // Appeler directement la méthode acheterProduit du service avec les trois arguments
      const result = await this.achatService.acheterProduit(utilisateurId, produitId, paymentIntentId);
      
      return reply.status(200).send(result);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Erreur lors de l\'achat du produit' });
    }
  }  
}
