const _ = require('lodash');
const path = require('path'); // eslint-disable-line no-unused-vars
const nconf = require('nconf');
const winston = require('winston');
const walk = require('./../_lib/path').walk;
nconf
  .argv()
  .env()
  .file({file: `${__dirname}/local.env.json`});

const packageJson = require('./../../../package.json');

const defaults = {
  name: 'react-hello-world',
  host: nconf.get('HOST') || '127.0.0.1',
  env: nconf.get('NODE_ENV') || nconf.get('APP_ENV') || 'development',
  secure: !!nconf.get('APP_SECURE') || false,
  schema: !!nconf.get('APP_SECURE') ? 'https://':'http://',
  version: packageJson.version, // eslint-disable-line global-require
  apiVersions: [1.1],
  jwt: {
    tokenCookieName: nconf.get('JWT_COOKIENAME') || 'jwt',
    tokenSecret: nconf.get('JWT_SECRET') || 'a token secret',
    options: {
      expiresIn: 2630000 // ~1 month in seconds
    },
  },
  secret: 'the super secret key now one should ever know',
  session: {
    secret: 'super secret is top secret',
  },
  redis: {
    uri: nconf.get('REDIS_URI') || 'redis://127.0.0.1:6379/1', // redis-cli flushall, redis-cli, select 1, keys *
    enabled: !!nconf.get('REDIS_ENABLED') || true,
    shortTTL: nconf.get('REDIS_SHORT_TTL') || 300,
    longTTL: nconf.get('REDIS_LONG_TTL') || 3600,
    digest: nconf.get('REDIS_DIGEST') || null, // 'md5', // 'sha256'
  },
  mongo: {
    uri: nconf.get('MONGO_URI') || 'mongodb://127.0.0.1:27017/hello-world',
    auth: {
      user: nconf.get('MONGO_USER') || '',
      pass: nconf.get() || '',
    },
    options: {
      server: {
        reconnectTries: Number.MAX_VALUE,
      },
    },
  },
  logger: new winston.Logger({
    level: nconf.get('LOG_LEVEL') || 'info',
    transports: [
      new winston.transports.Console({
        colorize: true,
        timestamp: false,
        json: true,
        handleExceptions: true,
      }),
      new winston.transports.File({
        filename: path.join(__dirname, '/../logs/server.log'),
        timestamp: true,
        handleExceptions: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
      }),
    ],
    exitOnError: false,
  }),
  morgan: {
    format: nconf.get('MORGAN_FORMAT') || 'compact',
  },
  i18n: {
    locales:['de', 'en', 'es', 'fr', 'it', 'nl', 'ru'],
    defaultLocales: 'en',
    directory: __dirname + '/../../locales',
    directoryPermissions: '755',
    extension: '.json',
    cookie: 'l',
    queryParameter: 'l',
    logDebugFn: function (msg) {
      defaults.logger.debug(msg);
    },
    logWarnFn: function (msg) {
      defaults.logger.warn(msg);
    },
    logErrorFn: function (msg) {
      defaults.logger.error(msg);
    },
    api: {
      '__': 't',  //now req.__ becomes req.t
      '__n': 'tn', //and req.__n can be called as req.tn
      '__l': 'tl',
      '__h': 'th',
    },
    preserveLegacyCase: true,
    objectNotation: true,
  },
  auth: {
    amazon: {
      name: 'Amazon',
      clientID: nconf.get('AMAZON_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('AMAZON_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('AMAZON_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/amazon/callback`
    },
    beam: {
      name: 'Beam',
      clientID: nconf.get('BEAM_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('BEAM_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('BEAM_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/beam/callback`
    },
    bitbucket: {
      name: 'BitBucket',
      clientID: nconf.get('BITBUCKET_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('BITBUCKET_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('BITBUCKET_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/bitbucket/callback`
    },
    bnet: {
      name: 'Bnet',
      clientID: nconf.get('BNET_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('BNET_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('BNET_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/bnet/callback`
    },
    dropbox: {
      name: 'DropBox',
      clientID: nconf.get('DROPBOX_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('DROPBOX_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('DROPBOX_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/dropbox/callback`
    },
    evernote: {
      name: 'EverNote',
      consumerKey: nconf.get('EVERNOTE_CONSUMER_KEY') || 'KEY',
      consumerSecret: nconf.get('EVERNOTE_CONSUMER_SECRET') || 'SECRET',
      callbackURL: nconf.get('EVERNOTE_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/evernote/callback`,
    },
    facebook: {
      name: 'FaceBook',
      appID: nconf.get('FACEBOOK_APP_ID') || 'ID',
      appSecret: nconf.get('FACEBOOK_APP_SECRET') || 'SECRET',
      callbackURL: nconf.get('FACEBOOK_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/facebook/callback`
    },
    fitbit: {
      name: 'FitBit',
      clientID: nconf.get('FITBIT_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('FITBIT_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('FITBIT_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/beam/callback`
    },
    forcedotcom: {
      name: 'SalesForce',
      clientID: nconf.get('SALESFORCE_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('SALESFORCE_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('SALEFORCE_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/forcedotcom/callback`
    },
    foursquare: {
      name: 'FourSquare',
      clientID: nconf.get('FOURSQUARE_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('FOURSQUARE_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('FOURSQUARE_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/foursquare/callback`
    },
    github: {
      name: 'GitHub',
      clientID: nconf.get('GITHUB_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('GITHUB_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('GITHUB_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/github/callback`
    },
    google: {
      name: 'Google',
      clientID: nconf.get('GOOGLE_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('GOOGLE_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('GOOGLE_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/google/callback`,
    },
    instagram: {
      name: 'Instagram',
      clientID: nconf.get('INSTAGRAM_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('INSTAGRAM_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('INSTAGRAM_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/instagram/callback`,
    },
    linkedin: {
      name: 'LinkedIn',
      clientID: nconf.get('LINKEDIN_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('LINKEDIN_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('LINKEDIN_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/linkedin/callback`,
    },
    paypal: {
      name: 'PayPal',
      clientID: nconf.get('PAYPAL_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('PAYPAL_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('PAYPAL_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/paypal/callback`,
    },
    reddit: {
      name: 'Reddit',
      clientID: nconf.get('REDDIT_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('REDDIT_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('REDDIT_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/reddit/callback`,
    },
    rightsignature: {
      name: 'RightSignature',
      consumerKey: nconf.get('RIGHTSIGNATURE_CONSUMER_KEY') || 'KEY',
      consumerSecret: nconf.get('RIGHTSIGNATURE_CONSUMER_SECRET') || 'SECRET',
      callbackURL: nconf.get('RIGHTSIGNATURE_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/rightsignature/callback`,
    },
    runkeeper: {
      name: 'RunKeeper',
      clientID: nconf.get('RUNKEEPER_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('RUNKEEPER_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('RUNKEEPER_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/runkeeper/callback`,
    },
    sharepoint: {
      name: 'SharePoint',
      appID: nconf.get('SHAREPOINT_APP_ID') || 'ID',
      appSecret: nconf.get('SHAREPOINT_APP_SECRET') || 'SECRET',
      callbackURL: nconf.get('SHAREPOINT_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/sharepoint/callback`,
    },
    slack: {
      name: 'Slack',
      clientID: nconf.get('SLACK_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('SLACK_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('SLACK_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/slack/callback`,
    },
    soundcloud: {
      name: 'SoundCloud',
      clientID: nconf.get('SOUNDCLOUD_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('SOUNDCLOUD_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('SOUNDCLOUD_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/soundcloud/callback`,
    },
    spotify: {
      name: 'Spotify',
      clientID: nconf.get('SPOTIFY_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('SPOTIFY_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('SPOTIFY_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/spotify/callback`,
    },
    tumblr: {
      name: 'Tumblr',
      consumerKey: nconf.get('TUMBLR_CONSUMER_KEY') || 'KEY',
      consumerSecret: nconf.get('TUMBLR_CONSUMER_SECRET') || 'SECRET',
      callbackURL: nconf.get('TUBMLR_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/tumblr/callback`,
    },
    twitter: {
      name: 'Twitter',
      consumerKey: nconf.get('TWITTER_CONSUMER_KEY') || 'KEY',
      consumerSecret: nconf.get('TWITTER_CONSUMER_SECRET') || 'SECRET',
      callbackURL: nconf.get('TWITTER_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/twitter/callback`,
    },
    vkontakte: {
      name: 'Vkontakte',
      clientID: nconf.get('VK_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('VK_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('VK_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/vkontakte/callback`,
    },
    weibo: {
      name: 'Weibo',
      clientID: nconf.get('WEIBO_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('WEIBO_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('WEIBO_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/weibo/callback`,
    },
    windowslive: {
      name: 'WindowsLive',
      clientID: nconf.get('WINDOWSLIVE_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('WINDOWSLIVE_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('WINDOWSLIVE_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/windowslive/callback`,
    },
    yahoo: {
      name: 'Yahoo',
      clientID: nconf.get('YAHOO_CLIENT_ID') || 'ID',
      clientSecret: nconf.get('YAHOO_CLIENT_SECRET') || 'SECRET',
      callbackURL: nconf.get('YAHOO_CALLBACK_URL') || `${nconf.get('APP_URL')}/auth/yahoo/callback`,
    },
  },
};

/* eslint-disable */
module.exports = _.merge(defaults, require(`${__dirname}/${defaults.env === 'test' ? 'testing' : defaults.env}.js`) || {});
/* eslint-enable */
