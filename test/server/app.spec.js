import expect from 'expect';
import server from './../../src/server/server';
import config from './../../src/server/config';

describe('Server app', () => {
  it('executes callback and returns the server instance', (done) => {
    expect(typeof server.start).toBe('function');
    expect(server.start({ port: config.port }, () => { return done(); }))
      .toIncludeKeys(['_connections', '_events', '_handle']);
  });
});
