import type { Knex } from 'knex';
import { knexConfig } from './src/database';

const config: { [key: string]: Knex.Config } = {
  development: {
    ...knexConfig,
    migrations: {
      extension: 'ts',
      directory: 'knex/migrations',
      tableName: 'migrations_history',
    },
  },
};

module.exports = config;
