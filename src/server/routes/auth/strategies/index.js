const strategies = {
  beam: require('./beam'),
  facebook: require('./facebook'),
  github: require('./github'),
  google: require('./google'),
  reddit: require('./reddit'),
  tumblr: require('./tumblr'),
  twitter: require('./twitter'),
};

const isConfigured = strategy => strategy.config;

module.exports.loader = (config) => Object.keys(strategies)
  .map(type => {
    const strategy = strategies[type];
    strategy.config = strategy.getConfig(config);
    strategy.type = type;
    return strategy
  })
  .filter(strategy => isConfigured(strategy));

const _saver = (user, done) => {

};

module.exports.userSaver = (accessToken, refreshToken, profile, done) => {
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

    if(!user.name) {
      user.name = profile.displayName ? profile.displayName : null;
    }
    if(!user.email) {
      user.email = profile.email ? profile.email : null;
    }
    if(!user.username) {
      user.username = profile.username ? profile.username : profile.email ? profile.email : profile.id;
    }
    if(!user.photo) {
      user.photo = profile.photos[0] ? profile.photos[0].value : null;
    }

    user[profile.provider].id = profile.id;

    user[profile.provider].token = accessToken;
    user[profile.provider].refresh = refreshToken;
    user[profile.provider].profile = profile;

    user.save((err) => {
      if (err) throw err;
      let result = {
        _id: user.id,
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
