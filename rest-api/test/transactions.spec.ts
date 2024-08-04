import {
  it,
  test,
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  expect,
} from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { execSync } from 'node:child_process';

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync('npm run migrate:rollback --all');
    execSync('npm run migrate:latest');
  });

  it('users should be able to create a new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 1250,
        type: 'income',
      })
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(201);
  });

  it('users should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 1250,
        type: 'income',
      });

    const cookies = createTransactionResponse.get('Set-Cookie');

    const response = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);

    expect(response.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 1250,
      }),
    ]);
  });
});
