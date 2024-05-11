/* eslint-disable */
const request = require('supertest');
const app = require('../app');
require('../config/testSetup');

describe('Payment API Endpoints', () => {
  it('returns 401 when accessed without authorization token', async () => {
    const res = await request(app).post('/api/v1/payment/pay').send({
      projectid: '662fe35c69b43e06e00940cb',
      payerid: '662fd9cc392a484f5fcec147',
      amount: '257',
      message: 'good work',
    });
    expect(res.statusCode).toBe(401);
  });

  it('fund projects', async () => {
    const res = await request(app)
      .post('/api/v1/payment/pay')
      .send({
        projectid: '662fe35c69b43e06e00940cb',
        payerid: '662fd9cc392a484f5fcec147',
        amount: '257',
        message: 'good work',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MmZkOWNjMzkyYTQ4NGY1ZmNlYzE0NyIsInVzZXJuYW1lIjoiYmFtbGFrdSIsImFib3V0IjoidW5jb3ZlcmluZyB0aGUgdHJ1dGggYmVoaW5kIGNyZWF0aXZpdHkiLCJlbWFpbCI6ImJlYW1sYWt1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGFyZXFFNE1CLnFYL0o3aHg1eTBLVS42UXYxNjYvN0kxRldCSUVZYloyR0tPNzBBSWIuNDZ5IiwiZm9sbG93aW5nIjpbIjY2MmZkYTA1MzkyYTQ4NGY1ZmNlYzE0YSJdLCJpbnRlcmVzdCI6WyJzb2NpYWx3b3JrIiwic29jaWFscHJlbnVlciJdLCJ2aXNpYmlsaXR5IjoicHVibGljIiwiX192IjowLCJpZCI6IjY2MmZkOWNjMzkyYTQ4NGY1ZmNlYzE0NyJ9LCJpYXQiOjE3MTU0MTQzNzEsImV4cCI6MTcxNTUwMDc3MX0.iH27K3ZyP30AFIaCjNIfA7eQAsrnQ2a0erHrwWYNctg',
      );
    expect(res.statusCode).toBe(200);
    expect(typeof res.body.response).toBe('string');
    expect(res.body.response.startsWith('https')).toBe(true);
  });

  it('refunding funds if project doesnot meet the goals', async () => {
    const res = await request(app)
      .post('/api/v1/payment/pay/refund')
      .send({
        projectid: '662fe0eb69b43e06e00940c7',
        paymentemail: 'sb-y371a30358162@personal.example.com',
        isAmount: '10',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MmZkOWNjMzkyYTQ4NGY1ZmNlYzE0NyIsInVzZXJuYW1lIjoiYmFtbGFrdSIsImFib3V0IjoidW5jb3ZlcmluZyB0aGUgdHJ1dGggYmVoaW5kIGNyZWF0aXZpdHkiLCJlbWFpbCI6ImJlYW1sYWt1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGFyZXFFNE1CLnFYL0o3aHg1eTBLVS42UXYxNjYvN0kxRldCSUVZYloyR0tPNzBBSWIuNDZ5IiwiZm9sbG93aW5nIjpbIjY2MmZkYTA1MzkyYTQ4NGY1ZmNlYzE0YSJdLCJpbnRlcmVzdCI6WyJzb2NpYWx3b3JrIiwic29jaWFscHJlbnVlciJdLCJ2aXNpYmlsaXR5IjoicHVibGljIiwiX192IjowLCJpZCI6IjY2MmZkOWNjMzkyYTQ4NGY1ZmNlYzE0NyJ9LCJpYXQiOjE3MTU0MTQzNzEsImV4cCI6MTcxNTUwMDc3MX0.iH27K3ZyP30AFIaCjNIfA7eQAsrnQ2a0erHrwWYNctg',
      );
    expect(res.statusCode).toBe(200);
    expect(res.body.response).toEqual('Successfully sent the payment');
  });
});
