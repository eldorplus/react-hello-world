exports.start = function start(config, readyCallback) {
  const conf = config || {};
  if (!this.server) {
    const express = require('express'); // eslint-disable-line global-require
    const app = express();

    app.use(express.static('static'));

    const port = conf.port || process.env.PORT || 8000;
    const name = conf.name || process.env.name || 'node';

    const instance = parseInt(process.env.NODE_APP_INSTANCE, 10) + 1 || 0;
    const instances = process.env.instances ? ` ${instance}/${process.env.instances}` : '';

    this.server = app.listen(port, () => {
      console.info(`${name}${instances} listening on port ${port}`); // eslint-disable-line no-console
      // callback to call when the server is ready
      if (readyCallback) {
        readyCallback();
      }
    });
  }
  return this.server;
};
