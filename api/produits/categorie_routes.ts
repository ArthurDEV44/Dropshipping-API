import { FastifyInstance } from 'fastify';
import CategorieController from './categorie_controller';

export default async function categorieRoutes(fastify: FastifyInstance) {
  const categorieController = new CategorieController(fastify);

  fastify.route({
    method: 'POST',
    url: '/categories',
    handler: categorieController.creerCategorie.bind(categorieController),
    schema: {
      body: {
        type: 'object',
        required: ['nom', 'description'],
        properties: {
          nom: { type: 'string' },
          description: { type: 'string' },
        },
      },
      response: {
        201: { type: 'object', properties: { id: { type: 'string' }, nom: { type: 'string' }, description: { type: 'string' } } },
        400: { type: 'object', properties: { error: { type: 'string' } } },
        500: { type: 'object', properties: { error: { type: 'string' } } },
      },
    },
  });

  fastify.route({
    method: 'GET',
    url: '/categories',
    handler: categorieController.listerCategories.bind(categorieController),
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              nom: { type: 'string' },
              description: { type: 'string' },
            },
          },
        },
        500: { type: 'object', properties: { error: { type: 'string' } } },
      },
    },
  });
}
