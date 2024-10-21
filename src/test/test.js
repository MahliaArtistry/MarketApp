const request = require('supertest');
const mongoose = require('mongoose');
let server;

describe('Product API', () => {
  let productId;

  beforeAll(async () => {
    server = require('../server'); 
  });

  afterAll(async () => {
    await mongoose.connection.close(); 
    server.close(); 
  });

  it('should create a new product', async () => {
    const res = await request(server)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'This is a test product.',
        price: 100,
        quantity: 10,
        category: 'Test Category',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    productId = res.body._id;
  });

  it('should return all products', async () => {
    const res = await request(server).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should return a single product by ID', async () => {
    const res = await request(server).get(`/api/products/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', productId);
  });

  it('should update a product by ID', async () => {
    const res = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Updated Test Product',
        description: 'This is an updated test product.',
        price: 150,
        quantity: 20,
        category: 'Updated Test Category',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Test Product');
  });

  it('should delete a product by ID', async () => {
    const res = await request(server).delete(`/api/products/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Product deleted successfully');
  });

  it('should delete all products', async () => {
    const res = await request(server).delete('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'All products deleted successfully');
  });
});