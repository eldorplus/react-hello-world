const nconf = require('nconf');

module.exports = {
  port: nconf.get('PORT') || 443,
};
