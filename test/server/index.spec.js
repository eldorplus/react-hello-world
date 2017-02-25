const server = require('./../../src/server/app');

describe('Server', () => {
  it('start gets called', (done) => {
    spyOn(server, 'start');
    require('./../../src/server/index'); // eslint-disable-line global-require
    expect(server.start).toHaveBeenCalled();
    done();
  });
});
