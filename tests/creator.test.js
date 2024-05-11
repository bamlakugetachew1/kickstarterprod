/* eslint-disable */
const request = require('supertest');
const app = require('../app');
require('../config/testSetup');

describe('Creators API Endpoints', () => {
  it('create a new creators', async () => {
    const res = await request(app)
      .post(`/api/v1/creator`)
      .send({
        username: 'bereket',
        about: 'uncovering creativity to deep level',
        email: 'beki123@gmail.com',
        password: 'password',
        interest: ['music', 'art'],
      });
    expect(res.statusCode).toBe(201);
  });

  it('returns status code 400 when  email is alreday registered', async () => {
    const res = await request(app)
      .post(`/api/v1/creator`)
      .send({
        username: 'bereket',
        about: 'uncovering creativity to deep level',
        email: 'beki12@gmail.com',
        password: 'password',
        interest: ['music', 'art'],
      });
    expect(res.statusCode).toBe(400);
  });

  it('login with correct credintials', async () => {
    const res = await request(app).post(`/api/v1/creator/login`).send({
      email: 'beki12@gmail.com',
      password: 'password',
    });
    const creator = res.body.response;
    expect(res.statusCode).toBe(200);
    expect(creator.email).toBe('beki12@gmail.com');
    expect(creator).toHaveProperty('accessToken');
  });

  it('returns status code 404 when email is not found in our system', async () => {
    const res = await request(app).post(`/api/v1/creator/login`).send({
      email: 'incorrectemail@gmail.com',
      password: 'password',
    });
    expect(res.statusCode).toBe(404);
  });

  it('returns status code 401 with incorrect password', async () => {
    const res = await request(app).post(`/api/v1/creator/login`).send({
      email: 'beki12@gmail.com',
      password: 'incorrectpassword',
    });
    expect(res.statusCode).toBe(401);
  });

  it('get projects added to favourite list by creator', async () => {
    const creatorid = '662fd9cc392a484f5fcec147';
    const res = await request(app).get(`/api/v1/creator/favourites`).query({ creatorid: creatorid });
    const FavouriteProjects = res.body.response;
    expect(res.statusCode).toBe(200);
    expect(FavouriteProjects.length).toBeGreaterThan(0);
    FavouriteProjects.forEach((FavouriteProject) => {
      expect(FavouriteProject).toHaveProperty('_id');
      expect(FavouriteProject.projectid).toHaveProperty('title');
    });
  });

  it('returns status code 404 when there is no favourite added by creators', async () => {
    const creatorid = '663f1437edb3cb4ae9e3a025';
    const res = await request(app).get(`/api/v1/creator/favourites`).query({ creatorid: creatorid });
    expect(res.statusCode).toBe(404);
  });

  it('get projects created by creator', async () => {
    const creatorid = '662fd9cc392a484f5fcec147';
    const res = await request(app).get(`/api/v1/creator/createdprojects`).query({ creatorid: creatorid });
    const createdProjects = res.body.response;
    expect(res.statusCode).toBe(200);
    expect(createdProjects.length).toBeGreaterThan(0);
    createdProjects.forEach((createdProject) => {
      expect(createdProject).toHaveProperty('_id');
      expect(createdProject.projectid).toHaveProperty('title');
    });
  });

  it('returns status code 404 when there is no projects created by creators', async () => {
    const creatorid = '663f1437edb3cb4ae9e3a025';
    const res = await request(app).get(`/api/v1/creator/createdprojects`).query({ creatorid: creatorid });
    expect(res.statusCode).toBe(404);
  });
});
