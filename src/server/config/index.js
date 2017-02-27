const _ = require('lodash');
const path = require('path'); // eslint-disable-line no-unused-vars

const defaults = {
  name: 'react-hello-world',
  host: process.env.NODE_HOST || '127.0.0.1',
  env: process.env.NODE_ENV || 'development',
  version: require('./../../../package.json').version, // eslint-disable-line global-require
  session: {
    secret: ['super secret is top secret'],
  },
  auth: {
    google: {
      consumerKey: process.env.GOOGLE_CONSUMER_KEY || '',
      consumerSecret: process.env.GOOGLE_CONSUMER_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://www.example.com/auth/google/callback',
    },
  },
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hello-world',

    options: {
      server: {
        reconnectTries: Number.MAX_VALUE,
      },
    },
  },
};

let envConfig = {};
try {
  /* eslint-disable */
  // grab the config to merge with the defaults, overriding anything already defined in defaults
  envConfig = require(`${__dirname}/${defaults.env === 'test' ? 'testing' : defaults.env}.js`);
  /* eslint-enable */
} catch (error) {
  // set a default port when unable to load a config inside PhantomJS
  envConfig = {
    port: 9999,
  };
}

/* eslint-disable */
module.exports = _.merge(defaults, envConfig || {});
/* eslint-enable */
