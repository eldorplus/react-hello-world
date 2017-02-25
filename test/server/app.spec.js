import server from './../../src/server/app';
import expect from 'expect';

describe('Server app', () => {
  it('executes callback and returns the server instance', (done) => {
    expect(server.start({}, () => { return done(); })).toIncludeKeys(['_connections', '_events', '_handle']);
  });
});
