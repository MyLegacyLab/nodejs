import { FastifyInstance } from 'fastify';
import { dbConn } from '../database';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await dbConn('transactions').select();

    return { transactions };
  });

  app.get('/:id', async (request) => {
    const getTransactionParamSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamSchema.parse(request.params);

    const transaction = await dbConn('transactions').where('id', id).first();

    return { transaction };
  });

  app.get('/summary', async () => {
    const summary = await dbConn('transactions')
      .sum('amount', { as: 'amount' })
      .first();

    return { summary };
  });

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['income', 'expense']),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );

    await dbConn('transactions').insert({
      id: randomUUID(),
      title: title,
      amount: type === 'income' ? amount : amount * -1,
    });

    return reply.status(201).send();
  });
}
