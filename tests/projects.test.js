/* eslint-disable */
const request = require('supertest');
const app = require('../app');
require('../config/testSetup');

describe('Projects API Endpoints', () => {
  it('should get a list of all projects', async () => {
    const res = await request(app).get('/api/v1/projects');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    const projects = res.body.response;
    expect(projects.length).toBeGreaterThan(0);
    projects.forEach((project) => {
      expect(project).toHaveProperty('_id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('goal');
      expect(project).toHaveProperty('deadline');
      expect(project).toHaveProperty('amountReached');
    });
  });

  it('should return a single project', async () => {
    const projectid = '662ff03f69b43e06e00940e1';
    const res = await request(app).get('/api/v1/projects/single').query({ projectid: projectid });
    expect(res.statusCode).toBe(200);
    const singleproject = res.body.response;
    expect(singleproject).toHaveProperty('_id');
    expect(singleproject).toHaveProperty('title');
    expect(singleproject._id).toBe(projectid);
  });

  it('should return a 404 error if project ID does not exist', async () => {
    const nonExistentProjectId = '662ff03f69b43e06e00940e9';
    const res = await request(app).get('/api/v1/projects/single').query({ projectid: nonExistentProjectId });
    expect(res.statusCode).toBe(404);
  });

  it('should return a 400 error if project ID is not provided', async () => {
    const res = await request(app).get('/api/v1/projects/single');
    expect(res.statusCode).toBe(400);
  });

  it('returns 401 when accessed without authorization token', async () => {
    const projectid = '663e62acfa6b0649a413e5e1';
    const res = await request(app).delete(`/api/v1/projects/deleteproject/${projectid}`);
    expect(res.statusCode).toBe(401);
  });

  it('delete a specfic projecst', async () => {
    const projectid = '663e62acfa6b0649a413e5e1';
    const res = await request(app)
      .delete(`/api/v1/projects/deleteproject/${projectid}`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MmZkOWNjMzkyYTQ4NGY1ZmNlYzE0NyIsInVzZXJuYW1lIjoiYmFtbGFrdSIsImFib3V0IjoidW5jb3ZlcmluZyB0aGUgdHJ1dGggYmVoaW5kIGNyZWF0aXZpdHkiLCJlbWFpbCI6ImJlYW1sYWt1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGFyZXFFNE1CLnFYL0o3aHg1eTBLVS42UXYxNjYvN0kxRldCSUVZYloyR0tPNzBBSWIuNDZ5IiwiZm9sbG93aW5nIjpbIjY2MmZkYTA1MzkyYTQ4NGY1ZmNlYzE0YSJdLCJpbnRlcmVzdCI6WyJzb2NpYWx3b3JrIiwic29jaWFscHJlbnVlciJdLCJ2aXNpYmlsaXR5IjoicHVibGljIiwiX192IjowLCJpZCI6IjY2MmZkOWNjMzkyYTQ4NGY1ZmNlYzE0NyJ9LCJpYXQiOjE3MTU0MTQzNzEsImV4cCI6MTcxNTUwMDc3MX0.iH27K3ZyP30AFIaCjNIfA7eQAsrnQ2a0erHrwWYNctg',
      );
    expect(res.statusCode).toBe(200);
  });
});
