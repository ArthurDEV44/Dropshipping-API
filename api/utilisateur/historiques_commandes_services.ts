import Database from '../database/db.config';

export default class HistoriquesCommandesService {
    async getCommandesUtilisateur(utilisateurId: number) {
        try {
            const { rows } = await Database.query(
                'SELECT c.commande_id, c.date_commande, c.statut, p.nom as produit_nom, p.description, p.prix FROM commandes c JOIN produits p ON c.produit_id = p.id WHERE c.utilisateur_id = $1 ORDER BY c.date_commande DESC',
                [utilisateurId]
            );
            return rows;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'historique des commandes :', error);
            throw new Error('Impossible de récupérer l\'historique des commandes');
        }
    }
}
