const request = require('supertest');
const app = require('../../index');

describe('GET /api/search', () => {

  it('should search items', async () => {
    const response = await request(app)
      .get('/api/search?category=MLA1055&condition=new&site=MLA&limit=10')
      .set('x-auth-token', 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('paging');
    expect(response.body).toHaveProperty('categories');
    expect(response.body).toHaveProperty('items');
  });


  it('should handle error from search item', async () => {
    const response = await request(app)
      .get('/api/search?category=MLA1055&condition=new&site=INVALID_SITE&limit=10')
      .set('x-auth-token', 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc');
    
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });
});

describe('GET /api/items', () => {

  it('should get item details', async () => {
    const response = await request(app)
      .get('/api/items/MLA1471211850')
      .set('x-auth-token', 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('author');
    expect(response.body).toHaveProperty('item');
  });

  it('should handle error from item details', async () => {
    const response = await request(app)
      .get('/api/items/MLA14712850')
      .set('x-auth-token', 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc');
    
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });
});

describe('GET /', () => {
  it('should return a welcome message', async () => {
    const response = await request(app)
      .get('/')
      .set('x-auth-token', 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: 'ML-Middleend API' });
  });
});

describe('Auth Middleware', () => {
  it('should return 403 for invalid token', async () => {
    const response = await request(app)
      .get('/api/search?category=MLA1055&condition=new&site=MLA&limit=10')
      .set('x-auth-token', 'invalid-token');
    
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('error','Forbidden');
  });

  it('should get mock info', async () => {
    const response = await request(app)
      .get('/api/items/MLA1471211850')
      .set('x-auth-token', '55a4639f-55e8-4e14-a6cc-b79977b20a4e');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title','mock');
  });
});