import { FastifyInstance } from 'fastify';
import AuthController from './auth_controller';

export default async function authRoutes(fastify: FastifyInstance) {
  const authController = new AuthController(fastify);

  fastify.post('/signup', authController.signUp.bind(authController));
  fastify.post('/signin', authController.signIn.bind(authController));
}
