import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class GestionStockService {
  // Récupérer le niveau de stock actuel d'un produit
  async getNiveauStock(produitId: number) {
    try {
      const produit = await prisma.produit.findUnique({
        where: { id: produitId },
        select: { quantiteEnStock: true },
      });

      if (!produit) {
        throw new Error('Produit non trouvé');
      }
      return produit.quantiteEnStock;
    } catch (error) {
      console.error('Erreur lors de la récupération du niveau de stock :', error);
      throw new Error('Impossible de récupérer le niveau de stock');
    }
  }

  // Mettre à jour le niveau de stock d'un produit
  async updateNiveauStock(produitId: number, quantite: number) {
    try {
      const produit = await prisma.produit.findUnique({
          where: { id: produitId },
          select: { quantiteEnStock: true },
      });
          
      if (!produit) {
        throw new Error('Produit non trouvé');
      }

      const nouveauNiveauStock = produit.quantiteEnStock + quantite;

      const produitMisAJour = await prisma.produit.update({
        where: { id: produitId },
        data: { quantiteEnStock: nouveauNiveauStock },
      });
      return produitMisAJour;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du niveau de stock :', error);
      throw new Error('Impossible de mettre à jour le niveau de stock');
    }
  }
}
