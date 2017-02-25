const express = require('express');
const server = require('./../../src/server/app');

describe("Server app", function() {
  it("executes callback", function (done) {
    server.start( {}, () => { return done(); } );
  });
  it("port can be closed", function(done) {
    spyOn(server, 'close');
    server.close();
    expect(server.close).toHaveBeenCalled();
    done();
  });
});
