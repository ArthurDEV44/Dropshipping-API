import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import GestionStockService from './gestion_stock_services';

interface ParamsWithProduitId {
  produitId: string;
}

interface UpdateStockBody {
  quantite: number;
}

export default class GestionStockController {
  private gestionStockService: GestionStockService;

  constructor(fastify: FastifyInstance) {
    this.gestionStockService = new GestionStockService();
  }

  // Obtenir le niveau de stock actuel d'un produit
  public async getNiveauStock(
    request: FastifyRequest<{ Params: ParamsWithProduitId }>,
    reply: FastifyReply
  ) {
    try {
      const { produitId } = request.params;
      const produitIdNumber = parseInt(produitId, 10);

      if (isNaN(produitIdNumber)) {
        return reply.status(400).send({ error: 'ID de produit invalide.' });
      }

      const niveauStock = await this.gestionStockService.getNiveauStock(produitIdNumber);
      return reply.status(200).send({ produitId: produitIdNumber, niveauStock });
    } catch (error) {
      console.error('Erreur lors de la récupération du niveau de stock:', error);
      return reply.status(500).send({ error: 'Erreur lors de la récupération du niveau de stock' });
    }
  }

  // Mettre à jour le niveau de stock pour un produit
  public async updateNiveauStock(
    request: FastifyRequest<{ Params: ParamsWithProduitId; Body: UpdateStockBody }>,
    reply: FastifyReply
  ) {
    try {
      const { produitId } = request.params;
      const { quantite } = request.body;
      const produitIdNumber = parseInt(produitId, 10);

      if (isNaN(produitIdNumber)) {
        return reply.status(400).send({ error: 'ID de produit invalide.' });
      }

      if (typeof quantite !== 'number' || quantite <= 0) {
        return reply.status(400).send({ error: 'La quantité doit être un nombre positif.' });
      }

      const produitMisAJour = await this.gestionStockService.updateNiveauStock(produitIdNumber, quantite);
      return reply.status(200).send({ message: 'Niveau de stock mis à jour avec succès', produit: produitMisAJour });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du niveau de stock:', error);

      if (error instanceof Error && error.message.includes('Produit non trouvé')) {
        return reply.status(404).send({ error: error.message });
      }
      return reply.status(500).send({ error: 'Erreur lors de la mise à jour du niveau de stock' });
    }
  }
}
