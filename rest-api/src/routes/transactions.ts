import { FastifyInstance } from 'fastify';
import { dbConn } from '../database';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { checkSessionId } from '../middlewares/check-session-id';

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: checkSessionId }, async (request, reply) => {
    const { sessionId } = request.cookies;

    const transactions = await dbConn('transactions')
      .where('session_id', sessionId)
      .select();

    return { transactions };
  });

  app.get('/:id', { preHandler: checkSessionId }, async (request) => {
    const getTransactionParamSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamSchema.parse(request.params);

    const { sessionId } = request.cookies;

    const transaction = await dbConn('transactions')
      .where({
        id: id,
        session_id: sessionId,
      })
      .first();

    return { transaction };
  });

  app.get('/summary', { preHandler: checkSessionId }, async (request) => {
    const { sessionId } = request.cookies;

    const summary = await dbConn('transactions')
      .where({
        session_id: sessionId,
      })
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

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }

    await dbConn('transactions').insert({
      id: randomUUID(),
      title: title,
      amount: type === 'income' ? amount : amount * -1,
      session_id: sessionId,
    });

    return reply.status(201).send();
  });
}
