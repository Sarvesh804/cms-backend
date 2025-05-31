import request from 'supertest';
import {app} from '../src/index';

let token: string;

beforeAll(async () => {
  // Login first to get token
  const res = await request(app)
    .post('/login')
    .send({ username: 'testuser', password: 'password123' });

  token = res.body.token;
});

describe('Articles API', () => {
  it('should create an article', async () => {
    const res = await request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Title', content: 'Test Content' });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe('Test Title');
  });

  it('should list articles for the user', async () => {
    const res = await request(app)
      .get('/articles')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});