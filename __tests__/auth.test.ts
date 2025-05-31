import request from 'supertest';
import {app} from '../src/index';

describe('Authentication', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.username).toBe('testuser');
  });

  it('should login and return token', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});