const server = require('./../../src/server/server');

describe('Server', () => {
  it('start gets called', (done) => {
    spyOn(server, 'start');
    const instance = require('./../../src/server/index'); // eslint-disable-line global-require
    expect(server.start).toHaveBeenCalled();
    console.log(instance); // eslint-disable-line no-console
    done();
  });
});
