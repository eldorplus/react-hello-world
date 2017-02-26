exports.start = function start(options, readyCallback) {
  if (typeof process.env.NODE_ENV === 'undefined') {
    /* eslint-disable */
    const fs = require('fs');
    const _ = require('lodash');
    const path = require('path');
    /* eslint-enable */

    fs.readdir(path.join(__dirname, './config'), (err, files) => {
      const val = _.filter(files, (name) => { return name.indexOf('index') !== 0; }).map((name) => { return name.replace('.js', ''); });
      console.error(`Unable to start server. Please set NODE_ENV to one of ${JSON.stringify(val)}`); // eslint-disable-line no-console
      process.exit();
    });
  } else {
    const opts = options || {};
    if (!this.server) {
      /* eslint-disable */
      const app = require('./app');
      const config = require('./../../src/server/config');
      /* eslint-enable */

      const port = opts.port || process.env.PORT || config.port;
      const name = opts.name || process.env.name || 'node';

      const instance = parseInt(process.env.NODE_APP_INSTANCE, 10) + 1 || 0;
      const instances = process.env.instances ? ` ${instance}/${process.env.instances}` : '';

      this.server = app.listen(port, () => {
        console.info(`${name}${instances} listening on port ${port} in ${config.env} mode`); // eslint-disable-line no-console
        if (instances === '') {
          console.info('Hit CTRL-C to stop the server'); // eslint-disable-line no-console
        } else {
          console.info('execute "npm run stop" to stop the server\nexecute "npm run restart" to restart the server\nexecute "npm run kill" to kill the server'); // eslint-disable-line no-console
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
