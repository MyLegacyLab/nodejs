import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      database: 'rest-api',
      password: 'postgres',
    },
    useNullAsDefault: true,
    migrations: {
      extension: 'ts',
      directory: 'knex/migrations',
      tableName: 'migrations_history',
    },
  },
};

module.exports = config;
