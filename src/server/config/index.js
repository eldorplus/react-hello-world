const _ = require('lodash');

const defaults = {
  name: 'react-hello-world',
  env: process.env.NODE_ENV,
  port: 8080,
};

/* eslint-disable */
module.exports = {
  config: _.merge(defaults, require(`./${process.env.NODE_ENV === 'test' ? 'testing' : process.env.NODE_ENV}.js`) || {}),
};
/* eslint-enable */
