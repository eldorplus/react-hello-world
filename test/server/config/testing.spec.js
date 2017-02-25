import expect from 'expect';
import config from './../../../src/server/config';

describe('Server config testing', () => {
  it('should contain property env equal to test', (done) => {
    expect(config).toIncludeKeys(['env']);
    expect(config.env).toBe('test');
    done();
  });
  it('should contain property port equal to 9999', (done) => {
    expect(config).toIncludeKeys(['port']);
    expect(config.port).toBe(9999);
    done();
  });
});
