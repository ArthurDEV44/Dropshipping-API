import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

export default class ProduitService {
  private fastify: FastifyInstance;
  private prisma: PrismaClient;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
    this.prisma = new PrismaClient();
  }

  async listAll(page: number, limit: number) {
    const cacheKey = `produits:page:${page}:limit:${limit}`;
    const cached = await this.fastify.redis.get(cacheKey);
  
    if (cached) {
      return JSON.parse(cached);
    }
  
    const offset = (page - 1) * limit;
    const produits = await this.prisma.produit.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        date_creation: 'desc',
      },
    });

    await this.fastify.redis.setex(cacheKey, 60 * 60, JSON.stringify(produits)); // Cache pour 1 heure
    return produits;
  }
  
  async addProduit(nom: string, description: string, prix: number, quantiteEnStock: number) {
    const produit = await this.prisma.produit.create({
      data: {
        nom,
        description,
        prix,
        quantiteEnStock,
      },
    });
    return produit;
  }

  async updateProduit(id: number, nom: string, description: string, prix: number, quantiteEnStock: number) {
    const produit = await this.prisma.produit.update({
      where: { id },
      data: {
        nom,
        description,
        prix,
        quantiteEnStock,
      },
    });
    return produit;
  }

  async deleteProduit(id: number) {
    const produit = await this.prisma.produit.delete({
      where: { id },
    });
    return produit;
  }

  async getProduitById(id: number) {
    const produit = await this.prisma.produit.findUnique({
      where: { id },
    });
    return produit;
  }
}
