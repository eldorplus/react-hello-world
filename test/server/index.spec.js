const server = require('./../../src/server/app');

describe("Server", function() {
  it("start gets called", function(done) {
    spyOn(server, 'start');
    require('./../../src/server/index');
    expect(server.start).toHaveBeenCalled();
    done();
  });
});
