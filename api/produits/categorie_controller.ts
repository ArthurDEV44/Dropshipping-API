import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import CategorieService from './categorie_services';

export default class CategorieController {
  private categorieService: CategorieService;

  constructor(fastify: FastifyInstance) {
    this.categorieService = new CategorieService();
  }

  // Créer une nouvelle catégorie
  public async creerCategorie(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { nom, description } = request.body as any; // Valide ces entrées dans une application réelle
      const categorie = await this.categorieService.creerCategorie(nom, description);
      
      return reply.status(201).send(categorie);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Erreur lors de la création de la catégorie' });
    }
  }

  // Liste toutes les catégories
  public async listerCategories(request: FastifyRequest, reply: FastifyReply) {
    try {
      const categories = await this.categorieService.listerCategories();
      
      return reply.status(200).send(categories);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Erreur lors de la récupération des catégories' });
    }
  }
}
