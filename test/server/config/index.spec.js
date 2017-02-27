import expect from 'expect';
import config from './../../../src/server/config';

describe('Server config index', () => {
  it('should contain property name', (done) => {
    expect(config).toIncludeKeys(['name']);
    done();
  });

  it('should contain property host', (done) => {
    expect(config).toIncludeKeys(['host']);
    expect(typeof config.host).toBe('string');
    expect(config.host).toNotBe('');
    expect(config.host).toNotBe(undefined);
    expect(config.host).toNotBe(null);
    done();
  });

  it('should contain property port', (done) => {
    expect(config).toIncludeKeys(['port']);
    expect(typeof config.port).toBe('number');
    // expect(config.port).toBeGreaterThan(49152);
    // expect(config.port).toBeLessThan(65535);
    done();
  });

  it('should contain property env', (done) => {
    expect(config).toIncludeKeys(['env']);
    expect(config.env).toBe('test');
    done();
  });

  it('should contain property version', (done) => {
    expect(config).toIncludeKeys(['version']);
    expect(config.version).toNotBe('');
    expect(config.version).toNotBe(undefined);
    expect(config.version).toNotBe(null);
    done();
  });

  it('should contain session.secret', (done) => {
    expect(config).toIncludeKeys(['session']);
    expect(config.session).toIncludeKeys(['secret']);
    expect(config.session.secret).toNotBe('');
    expect(config.session.secret).toNotBe(undefined);
    expect(config.session.secret).toNotBe(null);
    done();
  });
});
