import expect from 'expect';
import server from './../../src/server/app';
import config from './../../src/server/config/testing';

describe('Server app', () => {
  it('executes callback and returns the server instance', (done) => {
    expect(server.start({ port: config.port }, () => { return done(); })).toIncludeKeys(['_connections', '_events', '_handle']);
  });
});
