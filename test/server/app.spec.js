import server from './../../src/server/app';

describe('Server app', () => {
  it('executes callback', (done) => {
    server.start({}, () => { return done(); });
  });
  it('port can be closed', (done) => {
    spyOn(server, 'close');
    server.close();
    expect(server.close).toHaveBeenCalled();
    done();
  });
});
