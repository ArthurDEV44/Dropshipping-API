import { FastifyInstance } from 'fastify';
import GestionStockController from './gestion_stock_controller';

export default async function gestionStockRoutes(fastify: FastifyInstance) {
  const gestionStockController = new GestionStockController(fastify);

  fastify.get('/stocks/:produitId', gestionStockController.getNiveauStock.bind(gestionStockController));
  fastify.post('/stocks/:produitId', gestionStockController.updateNiveauStock.bind(gestionStockController));
}
