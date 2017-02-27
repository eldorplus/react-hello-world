import expect from 'expect';
import server from './../../src/server/server';
import config from './../../src/server/config';

describe('Server', () => {
  it('executes readyCallback and returns the server instance', (done) => {
    expect(typeof server.start).toBe('function');
    const instance = server.start({ port: config.port }, () => { return done(); });
    expect(instance).toIncludeKeys(['_connections', '_events', '_handle']);
    instance.close();
  });
});
