import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('La clé secrète Stripe est manquante.');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

export default class RemboursementService {
  async rembourser(chargeId: string) {
    try {
      const refund = await stripe.refunds.create({
        charge: chargeId,
      });

      return refund;
    } catch (error) {
      console.error('Erreur lors du remboursement :', error);
      throw new Error('Le remboursement a échoué');
    }
  }
}
