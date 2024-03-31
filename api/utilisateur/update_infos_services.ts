import bcrypt from 'bcrypt';
import Database from '../database/db.config';

export default class UpdateInfosService {
    async updateAddress(utilisateurId: number, nouvelleAdresse: string) {
        try {
            const { rows } = await Database.query(
                'UPDATE utilisateurs SET adresse_livraison = $1 WHERE utilisateur_id = $2 RETURNING *',
                [nouvelleAdresse, utilisateurId]
            );
            return rows[0];
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'adresse :', error);
            throw new Error('Impossible de mettre à jour l\'adresse');
        }
    }

    async updatePassword(utilisateurId: number, ancienMotDePasse: string, nouveauMotDePasse: string) {
        try {
            // Vérifie d'abord l'ancien mot de passe
            const { rows } = await Database.query(
                'SELECT mot_de_passe FROM utilisateurs WHERE utilisateur_id = $1',
                [utilisateurId]
            );

            if (rows.length === 0) {
                throw new Error('Utilisateur non trouvé');
            }

            const utilisateur = rows[0];
            const correspondance = await bcrypt.compare(ancienMotDePasse, utilisateur.mot_de_passe);

            if (!correspondance) {
                throw new Error('L\'ancien mot de passe ne correspond pas');
            }

            // Mise à jour du mot de passe
            const saltRounds = 10;
            const motDePasseHashe = await bcrypt.hash(nouveauMotDePasse, saltRounds);

            await Database.query(
                'UPDATE utilisateurs SET mot_de_passe = $1 WHERE utilisateur_id = $2',
                [motDePasseHashe, utilisateurId]
            );

            return { message: 'Mot de passe mis à jour avec succès' };
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe :', error);
            throw new Error('Impossible de mettre à jour le mot de passe');
        }
    }
}
