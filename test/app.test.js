const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/);
    });

    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
        .get('/apps')
        .query({ sort: 'MISTAKE' })
        .expect(400, 'Must sort by either Rating or App.');
    });

    it('should be 400 if genres is incorrect', () => {
        return supertest(app)
        .get('/apps')
        .query({ genres: 'MISTAKE' })
        .expect(400, 'Genres must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card');
    });
})