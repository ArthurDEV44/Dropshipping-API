import Database from '../database/db.config'; // Assure-toi que ce chemin est correct pour ta configuration

export default class GestionStockService {
    // Récupérer le niveau de stock actuel d'un produit
    async getNiveauStock(produitId: number) {
        try {
            const { rows } = await Database.query(
                'SELECT quantite_en_stock FROM produits WHERE id = $1',
                [produitId]
            );
            if (rows.length === 0) {
                throw new Error('Produit non trouvé');
            }
            return rows[0].quantite_en_stock;
        } catch (error) {
            console.error('Erreur lors de la récupération du niveau de stock :', error);
            throw new Error('Impossible de récupérer le niveau de stock');
        }
    }

    // Mettre à jour le niveau de stock d'un produit
    async updateNiveauStock(produitId: number, quantite: number) {
        try {
            const { rows: existingRows } = await Database.query(
                'SELECT quantite_en_stock FROM produits WHERE id = $1',
                [produitId]
            );
            if (existingRows.length === 0) {
                throw new Error('Produit non trouvé');
            }
            const nouveauNiveauStock = existingRows[0].quantite_en_stock + quantite;

            const { rows } = await Database.query(
                'UPDATE produits SET quantite_en_stock = $1 WHERE id = $2 RETURNING *',
                [nouveauNiveauStock, produitId]
            );
            return rows[0];
        } catch (error) {
            console.error('Erreur lors de la mise à jour du niveau de stock :', error);
            throw new Error('Impossible de mettre à jour le niveau de stock');
        }
    }
}
