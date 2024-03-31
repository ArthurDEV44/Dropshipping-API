import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import GestionStockService from './gestion_stock_services';

export default class GestionStockController {
  private gestionStockService: GestionStockService;

  constructor(fastify: FastifyInstance) {
    this.gestionStockService = new GestionStockService();
  }

  // Obtenir le niveau de stock actuel d'un produit
  public async getNiveauStock(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { produitId } = request.params as any;
      const niveauStock = await this.gestionStockService.getNiveauStock(produitId);
      
      return reply.status(200).send({ produitId, niveauStock });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Erreur lors de la récupération du niveau de stock' });
    }
  }

  // Mettre à jour le niveau de stock pour un produit
  public async updateNiveauStock(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { produitId } = request.params as any;
      const { quantite } = request.body as any;
      const produitMisAJour = await this.gestionStockService.updateNiveauStock(produitId, quantite);
      
      return reply.status(200).send({ message: 'Niveau de stock mis à jour avec succès', produit: produitMisAJour });
    } catch (err) {
        const error = err as Error;
      console.error(error);
      if (error.message.includes('Produit non trouvé')) {
        return reply.status(404).send({ error: error.message });
      }
      return reply.status(500).send({ error: 'Erreur lors de la mise à jour du niveau de stock' });
    }
  }
}
