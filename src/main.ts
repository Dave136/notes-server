import fastify from 'fastify';

const server = fastify({ logger: true });

server.get('/', async (request, reply) => {
  return { message: 'Notes API' };
});

const start = async () => {
  try {
    await server.listen(3000);
    server.log.debug('Server running at http://localhost:3000');
  } catch (err) {}
};

start();
