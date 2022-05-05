import fp from 'fastify-plugin';
import { resolvers, schema } from './graphql';
import type { FastifyInstance } from 'fastify';

export default fp(
  (fastify: FastifyInstance, _: any, next: (err?: Error) => void) => {
    fastify.graphql.extendSchema(schema);
    fastify.graphql.defineResolvers(resolvers);
    next();
  },
);
