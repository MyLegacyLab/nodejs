import { env } from './env';
import { app } from './app';

app
  .listen({
    port: env.API_PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!');
  });
