import expect from 'expect';
import config from './../../../src/server/config/production';

describe('Server config production', () => {
  it('should contain property port equal to 8000', (done) => {
    expect(config).toIncludeKeys(['port']);
    expect(config.port).toBe(8000);
    done();
  });
});
