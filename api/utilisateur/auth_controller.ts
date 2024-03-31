import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import AuthService from './auth_services';

export default class AuthController {
  private authService: AuthService;

  constructor(fastify: FastifyInstance) {
    this.authService = new AuthService();
  }

  public async signUp(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password, nom, prenom, adresse_livraison, telephone } = request.body as any; // Assure-toi de valider correctement les données en entrée
      const newUser = await this.authService.signUp(email, password, nom, prenom, adresse_livraison, telephone);

      return reply.code(201).send({
        message: 'Utilisateur créé avec succès',
        utilisateurId: newUser.utilisateur_id,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Erreur lors de la création du compte' });
    }
  }

  public async signIn(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as any; // Validation des données en entrée
      const { token } = await this.authService.signIn(email, password);

      return reply.code(200).send({
        message: 'Connexion réussie',
        token,
      });
    } catch (error) {
      console.error(error);
      return reply.status(401).send({ error: 'Email ou mot de passe incorrect' });
    }
  }

  // La déconnexion est généralement gérée côté client par suppression du token stocké
}
