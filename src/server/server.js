exports.start = function start(options, readyCallback) {
  if (typeof process.env.NODE_ENV === 'undefined') {
    /* eslint-disable */
    const fs = require('fs');
    const _ = require('lodash');
    const path = require('path');
    /* eslint-enable */

    fs.readdir(path.join(__dirname, './config'), (err, files) => {
      const environments = _.filter(files, (name) => { return name.indexOf('index') !== 0 && name.indexOf('.js') > 0; }).map((name) => { return name.replace('.js', ''); });
      console.error(`Unable to start server. Please set NODE_ENV to one of ${JSON.stringify(environments)}`); // eslint-disable-line no-console
      process.exit();
    });
  } else {
    const opts = options || {};
    if (!this.server) {
      /* eslint-disable */
      const app = require('./app');
      const config = require('./../../src/server/config');
      /* eslint-enable */

      const host = opts.host || process.env.HOST || config.host;
      const port = opts.port || process.env.PORT || config.port;
      const name = opts.name || process.env.name || 'node';

      // pm2 sets NODE_APP_INSTANCE and instances when started
      const instance = parseInt(process.env.NODE_APP_INSTANCE, 10) + 1 || 0;
      const instances = process.env.instances ? ` ${instance}/${process.env.instances}` : '';

      if (config.env !== 'production') {
        require('heapdump'); // eslint-disable-line global-require,import/no-extraneous-dependencies
      }
      this.server = app.listen(port, host, () => {
        config.logger.info(`${name}${instances} listening on ${host}:${port} in ${config.env} mode`); // eslint-disable-line no-console
        if (instances === '') {
          config.logger.info('Hit CTRL-C to stop the server'); // eslint-disable-line no-console
        } else {
          config.logger.info('execute "npm run stop" to stop the server\nexecute "npm run restart" to restart the server\nexecute "npm run kill" to kill the server'); // eslint-disable-line no-console
        }
        // callback to call when the server is ready
        if (readyCallback) {
          readyCallback();
        }
      });
    }
  }
  return this.server;
};

exports.close = function close() {
  if (this.server) return this.server.close();
  return false;
};
