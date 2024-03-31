import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import RemboursementService from './remboursement_services';

export default class RemboursementController {
  private remboursementService: RemboursementService;

  constructor(fastify: FastifyInstance) {
    this.remboursementService = new RemboursementService();
  }

  public async effectuerRemboursement(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { chargeId } = request.body as any;
      
      const refund = await this.remboursementService.rembourser(chargeId);
      
      return reply.send({
        message: 'Remboursement effectué avec succès',
        refund,
      });
    } catch (error) {
      return reply.status(500).send({ error: 'Erreur lors du remboursement' });
    }
  }
}
