import { FastifyInstance } from 'fastify';
import CategorieController from './categorie_controller';

export default async function categorieRoutes(fastify: FastifyInstance) {
  const categorieController = new CategorieController(fastify);

  fastify.post('/categories', categorieController.creerCategorie.bind(categorieController));
  fastify.get('/categories', categorieController.listerCategories.bind(categorieController));
}
