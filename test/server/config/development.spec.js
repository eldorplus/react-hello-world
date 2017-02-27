import expect from 'expect';
import config from './../../../src/server/config/development';

describe('Server config development', () => {
  it('should contain property port equal to 8080', (done) => {
    expect(config).toIncludeKeys(['port']);
    expect(config.port).toBe(8080);
    done();
  });
});
