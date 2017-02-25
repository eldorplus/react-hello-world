const config = require(`./../../src/server/config/${process.env.NODE_ENV === 'test' ? 'testing' : process.env.NODE_ENV}`); // eslint-disable-line import/no-dynamic-require

exports.start = function start(options, readyCallback) {
  const opts = options || {};
  if (!this.server) {
    const express = require('express'); // eslint-disable-line global-require
    const app = express();

    app.use(express.static('static'));

    const port = opts.port || process.env.PORT || config.port;
    const name = opts.name || process.env.name || 'node';

    const instance = parseInt(process.env.NODE_APP_INSTANCE, 10) + 1 || 0;
    const instances = process.env.instances ? ` ${instance}/${process.env.instances}` : '';

    this.server = app.listen(port, () => {
      console.info(`${name}${instances} listening on port ${port} in ${process.env.NODE_ENV} mode`); // eslint-disable-line no-console
      // callback to call when the server is ready
      if (readyCallback) {
        readyCallback();
      }
    });
  }
  return this.server;
};
