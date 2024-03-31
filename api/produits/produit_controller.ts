import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import ProduitService from './produit_services';

export default class ProduitController {
    private produitService: ProduitService;

    constructor(fastify: FastifyInstance) {
        this.produitService = new ProduitService(fastify);
    }

    public async listAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const query = request.query as { page: string; limit: string };
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 10;
    
            const produits = await this.produitService.listAll(page, limit);
            reply.send(produits);
        } catch (error) {
            reply.status(500).send({ error: 'Erreur lors de la récupération des produits' });
        }
    }    
    

    public async addProduit(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { nom, description, prix, quantite_en_stock } = request.body as any;
            const produit = await this.produitService.addProduit(nom, description, prix, quantite_en_stock);
            reply.status(201).send(produit);
        } catch (error) {
            reply.status(500).send({ error: 'Erreur lors de l\'ajout du produit' });
            console.error("Une erreur est survenue: ", error);
        }
    }

    public async updateProduit(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as any;
            const { nom, description, prix, quantite_en_stock } = request.body as any;
            const produit = await this.produitService.updateProduit(id, nom, description, prix, quantite_en_stock);
            if (produit) {
                reply.send(produit);
            } else {
                reply.status(404).send({ error: 'Produit non trouvé' });
            }
        } catch (error) {
            reply.status(500).send({ error: 'Erreur lors de la mise à jour du produit' });
        }
    }

    public async deleteProduit(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as any;
            const produit = await this.produitService.deleteProduit(id);
            if (produit) {
                reply.send({ message: 'Produit supprimé' });
            } else {
                reply.status(404).send({ error: 'Produit non trouvé' });
            }
        } catch (error) {
            reply.status(500).send({ error: 'Erreur lors de la suppression du produit' });
        }
    }

    public async getProduitById(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as any;
            const produit = await this.produitService.getProduitById(id);
            if (produit) {
                reply.send(produit);
            } else {
                reply.status(404).send({ error: 'Produit non trouvé' });
            }
        } catch (error) {
            reply.status(500).send({ error: 'Erreur lors de la récupération du produit' });
        }
    }
}
