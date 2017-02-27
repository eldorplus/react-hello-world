import expect from 'expect';
import config from './../../../src/server/config';

describe('Server config testing', () => {
  it('should contain property env equal to test', (done) => {
    expect(config).toIncludeKeys(['env']);
    expect(config.env).toBe('test');
    done();
  });
  it('should contain property port equal to a random port between 49152 and 65535', (done) => {
    expect(config).toIncludeKeys(['port']);
    expect(typeof config.port).toBe('number');
    expect(config.port).toBeLessThan(65535);
    expect(config.port).toBeGreaterThan(49152);
    done();
  });
});
