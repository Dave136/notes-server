import 'reflect-metadata';

import buildServer from './server';
import env from './utils/envConfig';

const start = async () => {
  env();
  const server = await buildServer();
  const port = +process.env.PORT;

  if (!port) {
    throw new Error('"PORT" variable is not defined');
  }

  server.listen(port, '127.0.0.1');
};

start();
