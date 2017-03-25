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
  tokenCookieName: process.env.JWT_COOKIENAME || 'jwt',
  tokenSecret: process.env.JWT_SECRET || 'a token secret',
  sessionSecret: process.env.SESSION_SECRET || 'a session secret',
  cookieDomain: '.' + envConfig.subDomain.split('.').slice(1).join('.'),
  session: {
    secret: 'super secret is top secret',
    maxAge: process.env.COOKIE_MAXAGE || tenDays,
  },
  redis: {

  },
  auth: {
    beam: {
      clientID: process.env.BEAM_CLIENT_ID || 'ID',
      clientSecret: process.env.BEAM_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.BEAM_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/beam/callback`
    },
    facebook: {
      appID: process.env.FACEBOOK_APP_ID || 'ID',
      appSecret: process.env.FACEBOOK_APP_SECRET || 'SECRET',
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/facebook/callback`
    },
    github: {
      clientID: process.env.GITHUB_CLIENT_ID || 'ID',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.GITHUB_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/github/callback`
    },
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID || 'ID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/google/callback`,
    },
    reddit: {
      clientID: process.env.REDDIT_CLIENT_ID || 'ID',
      clientSecret: process.env.REDDIT_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.REDDIT_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/reddit/callback`,
    },
    tumblr: {
      consumerKey: process.env.TUMBLR_CONSUMER_KEY || 'KEY',
      consumerSecret: process.env.TUMBLR_CONSUMER_SECRET || 'SECRET',
      callbackURL: process.env.TUBMLR_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/tumblr/callback`,
    },
    twitter: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY || 'KEY',
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'SECRET',
      callbackURL: process.env.TWITTER_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/twitter/callback`,
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
