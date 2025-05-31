import request from 'supertest';
import {app} from '../src/index';

let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/login')
    .send({ username: 'testuser', password: 'password123' });

  token = res.body.token;
});

describe('Recently Viewed Articles', () => {
  it('should track recently viewed articles', async () => {
    await request(app)
      .get('/articles/1')
      .set('Authorization', `Bearer ${token}`);

    const res = await request(app)
      .get('/recently-viewed')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toContain(1);
  });
});