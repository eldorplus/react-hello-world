const nconf = require('nconf');
const winston = require('winston');

module.exports = {
  port: nconf.get('PORT') || 8080,
  logger: new (winston.Logger)({
    level: nconf.get('LOG_LEVEL') || 'debug',
    transports: [
      new (winston.transports.Console)({ colorize: true, timestamp: true }),
    ],
  }),
};
