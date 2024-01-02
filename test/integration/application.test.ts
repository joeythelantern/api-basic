import request from 'supertest';
import { application, Shutdown } from '../../src/server';

describe('Application', () => {
    afterAll((done) => {
        Shutdown(done);
    });

    it('Starts and has the proper test environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(application).toBeDefined();
    }, 10000);

    it('Returns all options allowed when called from the HTTP method options', async () => {
        const response = await request(application).options('/');

        expect(response.status).toBe(200);
        expect(response.headers['access-control-allow-methods']).toBe('PUT, POST, PATCH, DELETE, GET');
    }, 10000);

    it('Returns 404 when the route requested is not found.', async () => {
        const response = await request(application).get('/a/cute/route/that/does/not/exist/');

        expect(response.status).toBe(404);
    }, 10000);
});
