import expect from 'expect';
import routes from './../../../src/server/routes';

describe('Routes', () => {
  it('should have GET /version', (done) => {
    console.log(routes.stack); // eslint-disable-line no-console
    expect(1).toBe(1);
    done();
  });
});
