import expect from 'expect';
import config from './../../../src/server/config';

describe('Server config index', () => {
  it('should contain property name', (done) => {
    expect(config).toIncludeKeys(['name']);
    done();
  });
  it('should contain property port', (done) => {
    expect(config).toIncludeKeys(['port']);
    done();
  });
  it('should contain property env', (done) => {
    expect(config).toIncludeKeys(['env']);
    done();
  });
});
