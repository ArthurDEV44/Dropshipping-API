import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: number;
      nom: string;
      prenom: string;
      email: string;
      // Ajoute ici d'autres propriétés de `user` selon les besoins de ton application
    };
  }
}
