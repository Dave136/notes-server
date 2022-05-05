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

  server.listen(
    {
      port,
      host: '0.0.0.0',
    },
    (err, address) => {
      if (err) throw new Error(err.message);
      server.log.info(`server listening on ${address}`);
    },
  );
};

start();
