import { dbConn } from '../database';
import crypto from 'node:crypto';

export async function transactionRoutes(app) {
  app.post('/create-transaction', async () => {
    const transaction = await dbConn('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Testing transaction',
        amount: 1000,
      })
      .returning('*');

    return transaction;
  });
}
