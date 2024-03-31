import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from '../database/db.config'; // Ajuste le chemin selon ta structure de projet

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret_key'; // Utilise une clé secrète plus sécurisée et stocke-la dans les variables d'environnement

export default class AuthService {
    async signUp(email: string, password: string, nom: string, prenom: string, adresse_livraison: string, telephone?: string) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insère le nouvel utilisateur dans la base de données
        try {
            const { rows } = await Database.query(
                'INSERT INTO utilisateurs (email, mot_de_passe, nom, prenom, adresse_livraison, telephone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING utilisateur_id',
                [email, hashedPassword, nom, prenom, adresse_livraison, telephone]
            );
            return rows[0];
        } catch (error) {
            throw new Error('La création du compte a échoué');
        }
    }

    async signIn(email: string, password: string) {
        try {
            const { rows } = await Database.query('SELECT utilisateur_id, mot_de_passe FROM utilisateurs WHERE email = $1', [email]);
            if (rows.length === 0) {
                throw new Error('Utilisateur non trouvé');
            }

            const { utilisateur_id, mot_de_passe } = rows[0];
            const match = await bcrypt.compare(password, mot_de_passe);
            if (!match) {
                throw new Error('Mot de passe incorrect');
            }

            // Crée un token JWT
            const token = jwt.sign({ utilisateur_id, email }, SECRET_KEY, { expiresIn: '1h' });
            return { token };
        } catch (error) {
            throw error;
        }
    }

    // La déconnexion est généralement gérée côté client en supprimant le JWT stocké
}
