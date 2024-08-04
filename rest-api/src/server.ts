import fastify from 'fastify';
import { env } from './env';
import { transactionRoutes } from './routes/transactions';

const app = fastify();

app.register(transactionRoutes);

app
  .listen({
    port: env.API_PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!');
  });
