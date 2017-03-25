const strategies = {
  amazon: require('./amazon'),
  beam: require('./beam'),
  bitbucket: require('./bitbucket'),
  bnet: require('./bnet'),
  dropbox: require('./dropbox'),
  evernote: require('./evernote'),
  facebook: require('./facebook'),
  fitbit: require('./fitbit'),
  forcedotcom: require('./forcedotcom'),
  foursquare: require('./foursquare'),
  github: require('./github'),
  google: require('./google'),
  instagram: require('./instagram'),
  linkedin: require('./linkedin'),
  paypal: require('./paypal'),
  reddit: require('./reddit'),
  sharepoint: require('./sharepoint'),
  slack: require('./slack'),
  spotify: require('./spotify'),
  tumblr: require('./tumblr'),
  twitter: require('./twitter'),
  vkontakte: require('./vkontakte'),
  weibo: require('./weibo'),
  windowslive: require('./windowslive'),
};

const isConfigured = strategy => strategy.config;

module.exports.loader = (config) => Object.keys(strategies)
  .map(type => {
    const strategy = strategies[type];
    strategy.name = config.auth[type] && config.auth[type].name ? config.auth[type].name : type;
    strategy.config = strategy.getConfig(config);
    strategy.type = type;
    return strategy
  })
  .filter(strategy => isConfigured(strategy));

const _saver = (user, done) => {

};

module.exports.userSaver = (fields, accessToken, refreshToken, profile, done) => {
  console.log('save profile', profile);
  const providerPath = `${profile.provider}.id`;
  const query = {};
  query[providerPath] = profile.id;

  const User = require('./../../../models/User');

  User.findOne(query, function(err, user) {
    if (err) done(err);

    if (!user) {
      user = new User();
    }

    user.role = profile.role;
    user.provider = profile.provider;

    fields(user);

    user[profile.provider].id = profile.id;

    user[profile.provider].token = accessToken;
    user[profile.provider].refresh = refreshToken;
    user[profile.provider].profile = profile;

    user.save((err) => {
      if (err) throw err;
      let result = {
        id: user.id,
        provider: user.provider,
      };
      result[user.provider] = {
        id: user[user.provider].id,
        token: user[user.provider].token,
        refresh: user[user.provider].refresh,
      };
      done(null, result);
    })
  });
};

module.exports.unlinker = (user, provider, done) => {
  user[provider] = undefined;
  user.save((err) => {
    if (err) done({error: err});
    done({redirect: '/'})
  })
};
