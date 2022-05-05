import fastify from 'fastify';
import mercurius from 'mercurius';

import typeormPlugin from './plugins/typeorm';
import modulesPlugin, { buildContext } from './plugins/graphql';
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: true,
  });

  server.get('/', async () => {
    return { message: 'Notes API' };
  });

  await server.register(typeormPlugin);
  await server.register(mercurius, {
    graphiql: true,
    defineMutation: true,
    context: (req: FastifyRequest, reply: FastifyReply) =>
      buildContext(req, reply),
  });
  await server.register(modulesPlugin);

  return server;
};
