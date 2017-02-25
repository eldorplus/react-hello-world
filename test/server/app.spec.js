import expect from 'expect';
import server from './../../src/server/app';

describe('Server app', () => {
  it('executes callback and returns the server instance', (done) => {
    expect(server.start({}, () => { return done(); })).toIncludeKeys(['_connections', '_events', '_handle']);
  });
});
