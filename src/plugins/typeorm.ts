import fp from 'fastify-plugin';
import { DataSource } from 'typeorm';

import User from '../models/user';
import { isDevelopment } from '../utils';

import type { FastifyInstance } from 'fastify';

const typeormPlugin = async (
  fastify: FastifyInstance,
  _: undefined,
  next: (err?: Error) => void,
): Promise<void> => {
  try {
    const {
      PGHOST = '127.0.0.1',
      PGPORT = 5432,
      POSTGRES_DB = 'notes',
      POSTGRES_USER = 'notes',
      POSTGRES_PASSWORD = 'notes',
    } = process.env;

    const appDataSource = new DataSource({
      type: 'postgres',
      host: PGHOST,
      port: +PGPORT,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      entities: [User],
      logging: isDevelopment(),
    });

    await appDataSource.initialize();
    console.log('Database is connected 🚧');

    fastify.decorate('typeorm', appDataSource);

    next();
  } catch (err) {
    next(err);
  }
};

export default fp(typeormPlugin, { name: 'typeorm' });
