import fastify from 'fastify';

import typeormPlugin from './plugins/typeorm';
import type { FastifyInstance } from 'fastify';

export default async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: {
      prettyPrint: true,
      level: 'debug',
    },
  });

  server.get('/', async (request, reply) => {
    return { message: 'Notes API' };
  });

  await server.register(typeormPlugin);

  return server;
};
