import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import UpdateInfosService from './update_infos_services';

export default class UpdateInfosController {
  private updateInfosService: UpdateInfosService;

  constructor(fastify: FastifyInstance) {
    this.updateInfosService = new UpdateInfosService();
  }

  public async updateAddress(request: FastifyRequest, reply: FastifyReply) {
    try {
      const utilisateurId = request.user?.id;
      if (typeof utilisateurId !== 'number') {
        return reply.status(400).send({ error: 'Identifiant utilisateur invalide' });
      }
  
      const { nouvelleAdresse } = request.body as any;
      
      if (!nouvelleAdresse) {
        return reply.status(400).send({ error: 'Nouvelle adresse requise' });
      }
  
      const updatedUser = await this.updateInfosService.updateAddress(utilisateurId, nouvelleAdresse);
      
      return reply.status(200).send({ message: 'Adresse mise à jour avec succès', utilisateur: updatedUser });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Erreur lors de la mise à jour de l\'adresse' });
    }
  }
  
  public async updatePassword(request: FastifyRequest, reply: FastifyReply) {
    try {
      const utilisateurId = request.user?.id;
      if (typeof utilisateurId !== 'number') {
        return reply.status(400).send({ error: 'Identifiant utilisateur invalide' });
      }
  
      const { ancienMotDePasse, nouveauMotDePasse } = request.body as any;
  
      if (!ancienMotDePasse || !nouveauMotDePasse) {
        return reply.status(400).send({ error: 'Ancien et nouveau mot de passe requis' });
      }
  
      await this.updateInfosService.updatePassword(utilisateurId, ancienMotDePasse, nouveauMotDePasse);
      
      return reply.status(200).send({ message: 'Mot de passe mis à jour avec succès' });
    } catch (err) {
        const error = err as Error;
      console.error(error);
      if (error.message === 'L\'ancien mot de passe ne correspond pas') {
        return reply.status(400).send({ error: error.message });
      }
      return reply.status(500).send({ error: 'Erreur lors de la mise à jour du mot de passe' });
    }
  }  
}
