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
  // sessionSecret: process.env.SESSION_SECRET || 'a session secret',
  cookieDomain: '.' + envConfig.subDomain.split('.').slice(1).join('.'),
  session: {
    secret: 'super secret is top secret',
    maxAge: process.env.COOKIE_MAXAGE || tenDays,
  },
  redis: {

  },
  auth: {
    amazon: {
      name: 'Amazon',
      clientID: process.env.AMAZON_CLIENT_ID || 'ID',
      clientSecret: process.env.AMAZON_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.AMAZON_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/amazon/callback`
    },
    beam: {
      name: 'Beam',
      clientID: process.env.BEAM_CLIENT_ID || 'ID',
      clientSecret: process.env.BEAM_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.BEAM_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/beam/callback`
    },
    bitbucket: {
      name: 'ButBucket',
      clientID: process.env.BITBUCKET_CLIENT_ID || 'ID',
      clientSecret: process.env.BITBUCKET_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.BITBUCKET_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/bitbucket/callback`
    },
    bnet: {
      name: 'Bnet',
      clientID: process.env.BNET_CLIENT_ID || 'ID',
      clientSecret: process.env.BNET_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.BNET_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/bnet/callback`
    },
    dropbox: {
      name: 'DropBox',
      clientID: process.env.DROPBOX_CLIENT_ID || 'ID',
      clientSecret: process.env.DROPBOX_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.DROPBOX_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/dropbox/callback`
    },
    evernote: {
      name: 'EverNote',
      consumerKey: process.env.EVERNOTE_CONSUMER_KEY || 'KEY',
      consumerSecret: process.env.EVERNOTE_CONSUMER_SECRET || 'SECRET',
      callbackURL: process.env.EVERNOTE_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/evernote/callback`,
    },
    facebook: {
      name: 'FaceBook',
      appID: process.env.FACEBOOK_APP_ID || 'ID',
      appSecret: process.env.FACEBOOK_APP_SECRET || 'SECRET',
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/facebook/callback`
    },
    fitbit: {
      name: 'FitBit',
      clientID: process.env.FITBIT_CLIENT_ID || 'ID',
      clientSecret: process.env.FITBIT_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.FITBIT_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/beam/callback`
    },
    forcedotcom: {
      name: 'SalesForce',
      clientID: process.env.SALESFORCE_CLIENT_ID || 'ID',
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.SALEFORCE_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/forcedotcom/callback`
    },
    foursquare: {
      name: 'FourSquare',
      clientID: process.env.FOURSQUARE_CLIENT_ID || 'ID',
      clientSecret: process.env.FOURSQUARE_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.FOURSQUARE_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/foursquare/callback`
    },
    github: {
      name: 'GitHub',
      clientID: process.env.GITHUB_CLIENT_ID || 'ID',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.GITHUB_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/github/callback`
    },
    google: {
      name: 'Google',
      clientID: process.env.GOOGLE_CLIENT_ID || 'ID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/google/callback`,
    },
    instagram: {
      name: 'Instagram',
      clientID: process.env.INSTAGRAM_CLIENT_ID || 'ID',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.INSTAGRAM_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/instagram/callback`,
    },
    linkedin: {
      name: 'LinkedIn',
      clientID: process.env.LINKEDIN_CLIENT_ID || 'ID',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.LINKEDIN_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/linkedin/callback`,
    },
    paypal: {
      name: 'PayPal',
      clientID: process.env.PAYPAL_CLIENT_ID || 'ID',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.PAYPAL_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/paypal/callback`,
    },
    reddit: {
      name: 'Reddit',
      clientID: process.env.REDDIT_CLIENT_ID || 'ID',
      clientSecret: process.env.REDDIT_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.REDDIT_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/reddit/callback`,
    },
    runkeeper: {
      name: 'RunKeeper',
      clientID: process.env.RUNKEEPER_CLIENT_ID || 'ID',
      clientSecret: process.env.RUNKEEPER_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.RUNKEEPER_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/runkeeper/callback`,
    },
    sharepoint: {
      name: 'SharePoint',
      appID: process.env.SHAREPOINT_APP_ID || 'ID',
      appSecret: process.env.SHAREPOINT_APP_SECRET || 'SECRET',
      callbackURL: process.env.SHAREPOINT_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/sharepoint/callback`,
    },
    slack: {
      name: 'Slack',
      clientID: process.env.SLACK_CLIENT_ID || 'ID',
      clientSecret: process.env.SLACK_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.SLACK_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/slack/callback`,
    },
    soundcloud: {
      name: 'SoundCloud',
      clientID: process.env.SOUNDCLOUD_CLIENT_ID || 'ID',
      clientSecret: process.env.SOUNDCLOUD_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.SOUNDCLOUD_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/soundcloud/callback`,
    },
    spotify: {
      name: 'Spotify',
      clientID: process.env.SPOTIFY_CLIENT_ID || 'ID',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.SPOTIFY_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/spotify/callback`,
    },
    tumblr: {
      name: 'Tumblr',
      consumerKey: process.env.TUMBLR_CONSUMER_KEY || 'KEY',
      consumerSecret: process.env.TUMBLR_CONSUMER_SECRET || 'SECRET',
      callbackURL: process.env.TUBMLR_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/tumblr/callback`,
    },
    twitter: {
      name: 'Twitter',
      consumerKey: process.env.TWITTER_CONSUMER_KEY || 'KEY',
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'SECRET',
      callbackURL: process.env.TWITTER_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/twitter/callback`,
    },
    vkontakte: {
      name: 'Vkontakte',
      clientID: process.env.VK_CLIENT_ID || 'ID',
      clientSecret: process.env.VK_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.VK_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/vkontakte/callback`,
    },
    weibo: {
      name: 'Weibo',
      clientID: process.env.WEIBO_CLIENT_ID || 'ID',
      clientSecret: process.env.WEIBO_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.WEIBO_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/weibo/callback`,
    },
    windowslive: {
      name: 'WindowsLive',
      clientID: process.env.WINDOWSLIVE_CLIENT_ID || 'ID',
      clientSecret: process.env.WINDOWSLIVE_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.WINDOWSLIVE_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/windowslive/callback`,
    },
    yahoo: {
      name: 'Yahoo',
      clientID: process.env.YAHOO_CLIENT_ID || 'ID',
      clientSecret: process.env.YAHOO_CLIENT_SECRET || 'SECRET',
      callbackURL: process.env.YAHOO_CALLBACK_URL || `http://${envConfig.subDomain}${':' + envConfig.port}/auth/windowslive/callback`,
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
