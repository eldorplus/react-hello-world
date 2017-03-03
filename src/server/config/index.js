const _ = require('lodash');
const path = require('path'); // eslint-disable-line no-unused-vars

const tenDays = 1000 * 60 * 60 * 24 * 10;

const env = process.env.NODE_ENV || 'development';

let envConfig = {};
try {
  /* eslint-disable */
  // grab the config to merge with the defaults, overriding anything already defined in defaults
  envConfig = require(`${__dirname}/${env === 'test' ? 'testing' : env}.js`);
  /* eslint-enable */
} catch (error) {
  // set a default port when unable to load a config inside PhantomJS
  envConfig = {
    port: 9999,
  };
}

const defaults = {
  name: 'react-hello-world',
  host: process.env.HOST || '127.0.0.1',
  env,
  version: require('./../../../package.json').version, // eslint-disable-line global-require
  subDomain: envConfig.subDomain,
  protocol: process.env.SUBDOMAIN ? 'https://' : 'http://',
  profileCookieName: process.env.PROFILE_COOKIENAME || 'profile',
  tokenCookieName: process.env.JWT_COOKIENAME || 'jwt',
  tokenSecret: process.env.JWT_SECRET || 'a token secret',
  sessionSecret: process.env.SESSION_SECRET || 'a session secret',
  cookieDomain: '.' + envConfig.subDomain.split('.').slice(1).join('.'),
  session: {
    secret: ['super secret is top secret'],
    maxAge: process.env.COOKIE_MAXAGE || tenDays,
  },
  auth: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID || 'ID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/google/callback`,
    },
  },
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hello-world',
    auth: {
      user: '',
      pass: '',
    },
    options: {
      server: {
        reconnectTries: Number.MAX_VALUE,
      },
    },
  },
  tenDays,
};

/* eslint-disable */
module.exports = _.merge(defaults, envConfig || {});
/* eslint-enable */
