exports.start = function( config, readyCallback ) {
  if(!this.server) {
    const express = require('express');

    const app = express();

    app.use(express.static('static'));

    const port = config.port || process.env.PORT || 8000;
    const name = config.name || process.env.name || 'node';

    const instance = parseInt(process.env.NODE_APP_INSTANCE, 10) + 1 || 0;
    const instances = process.env.instances ? ` ${instance}/${process.env.instances}` : '';

    this.server = app.listen( port, function() {
      console.log(`${name}${instances} listening on port ${port}`); // eslint-disable-line no-console
      // callback to call when the server is ready
      if(readyCallback) {
        readyCallback();
      }
    });
  }
};

exports.close = function() {
  this.server.close();
};
