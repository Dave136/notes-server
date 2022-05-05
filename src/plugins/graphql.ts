import fp from 'fastify-plugin';
import { authModule, userModule } from '../modules';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export const buildContext = async (
  req: FastifyRequest,
  _reply: FastifyReply,
) => ({
  authorization: req.headers.authorization,
  ...req.context,
});

export default fp(
  (fastify: FastifyInstance, _: any, next: (err?: Error) => void) => {
    fastify.register(userModule);
    fastify.register(authModule);
    next();
  },
);
