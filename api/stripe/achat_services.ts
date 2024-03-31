import Database from '../database/db.config';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('La clé secrète Stripe est manquante.');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

export default class AchatService {
  async acheterProduit(utilisateurId: number, produitId: number, amount: number) {
    // Récupérer les détails du produit depuis la base de données
    const { rows } = await Database.query('SELECT * FROM produits WHERE id = $1', [produitId]);
    const produit = rows[0];

    if (!produit) {
      throw new Error('Produit non trouvé');
    }

    // Créer une intention de paiement avec le montant du produit
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Convertis en centimes
      currency: 'eur',
    });

    // Retourner l'ID de l'intention de paiement pour être utilisé lors de la confirmation du paiement
    return paymentIntent.id;
  }

  async confirmerPaiement(utilisateurId: number, produitId: number, intentId: string) {
    // Confirmer le paiement de l'intention avec Stripe
    const paymentIntent = await stripe.paymentIntents.confirm(intentId);

    // Si le paiement a été confirmé, effectuer les opérations nécessaires dans la base de données
    if (paymentIntent.status === 'succeeded') {
      // Insérer la commande dans la base de données
      const { rows: commandeRows } = await Database.query(
        'INSERT INTO commandes (produit_id, utilisateur_id, statut) VALUES ($1, $2, $3) RETURNING commande_id',
        [produitId, utilisateurId, 'payé'] // ou un autre statut initial approprié
      );
      const commande = commandeRows[0];

      // Mettre à jour le stock du produit
      await Database.query(
        'UPDATE produits SET quantite_en_stock = quantite_en_stock - 1 WHERE id = $1',
        [produitId]
      );

      // Retourner l'ID de la commande créée
      return commande.commande_id;
    } else {
      throw new Error('Le paiement n\'a pas pu être confirmé');
    }
  }
}
