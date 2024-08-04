import knex from 'knex';
import { env } from './env';

export const knexConfig = {
  client: env.DATABASE_CLIENT,
  connection: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
  },
  useNullAsDefault: true,
};

export const dbConn = knex(knexConfig);
