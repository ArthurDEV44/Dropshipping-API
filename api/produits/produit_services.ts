import Database from '../database/db.config'; // Utilisation de l'extension n'est pas nécessaire avec TypeScript
import { FastifyInstance } from 'fastify';

export default class ProduitService {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async listAll(page: number, limit: number) {
    const cacheKey = `produits:page:${page}:limit:${limit}`;
    const cached = await this.fastify.redis.get(cacheKey);
  
    if (cached) {
      return JSON.parse(cached);
    }
  
    const offset = (page - 1) * limit;
    const { rows } = await Database.query('SELECT * FROM produits ORDER BY date_creation DESC LIMIT $1 OFFSET $2', [limit, offset]);
    await this.fastify.redis.setex(cacheKey, 60 * 60, JSON.stringify(rows)); // Cache pour 1 heure
    return rows;
  }
  

  async addProduit(nom: string, description: string, prix: number, quantite_en_stock: number) {
    const { rows } = await Database.query(
      'INSERT INTO produits (nom, description, prix, quantite_en_stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [nom, description, prix, quantite_en_stock]
    );
    return rows[0];
  }

  async updateProduit(id: number, nom: string, description: string, prix: number, quantite_en_stock: number) {
    const { rows } = await Database.query(
      'UPDATE produits SET nom = $2, description = $3, prix = $4, quantite_en_stock = $5 WHERE id = $1 RETURNING *',
      [id, nom, description, prix, quantite_en_stock]
    );
    return rows[0];
  }

  async deleteProduit(id: number) {
    const { rows } = await Database.query(
      'DELETE FROM produits WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  }

  async getProduitById(id: number) {
    const { rows } = await Database.query('SELECT * FROM produits WHERE id = $1', [id]);
    return rows[0];
  }
}
