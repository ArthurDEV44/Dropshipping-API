import { FastifyInstance } from 'fastify';
import GestionStockController from './gestion_stock_controller';

export default async function gestionStockRoutes(fastify: FastifyInstance) {
  const gestionStockController = new GestionStockController(fastify);

  // Schéma pour les paramètres de la route
  const paramsSchema = {
    type: 'object',
    properties: {
      produitId: { type: 'string' }, // Assurez-vous que le type correspond à votre utilisation (string ou number)
    },
    required: ['produitId'],
  };

  // Schéma pour le corps de la requête de mise à jour du stock
  const bodySchema = {
    type: 'object',
    properties: {
      quantite: { type: 'number', minimum: 1 },
    },
    required: ['quantite'],
  };

  // Route pour obtenir le niveau de stock
  fastify.get('/stocks/:produitId', {
    schema: {
      params: paramsSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            produitId: { type: 'string' },
            niveauStock: { type: 'number' },
          },
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    handler: gestionStockController.getNiveauStock.bind(gestionStockController),
  });

  // Route pour mettre à jour le niveau de stock
  fastify.post('/stocks/:produitId', {
    schema: {
      params: paramsSchema,
      body: bodySchema,
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            produit: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                nom: { type: 'string' },
                niveauStock: { type: 'number' },
              },
            },
          },
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    handler: gestionStockController.updateNiveauStock.bind(gestionStockController),
  });
}
