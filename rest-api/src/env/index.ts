import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'stg', 'prod']).default('prod'),
  API_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'API_PORT must be a number',
    }),
  DATABASE_CLIENT: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'DATABASE_PORT must be a number',
    }),
  DATABASE_USER: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PASSWORD: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format());

  throw new Error('Invalid environment variables!');
}

export const env = _env.data;
