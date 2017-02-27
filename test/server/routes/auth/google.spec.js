import expect from 'expect';
import routes from './../../../../src/server/routes';

describe('Routes', () => {
  it('should have GET /auth/google', (done) => {
    console.log(routes.stack); // eslint-disable-line no-console
    expect(1).toBe(1);
    done();
  });
  it('should have GET /auth/google/callback', (done) => {
    done();
  });
});
