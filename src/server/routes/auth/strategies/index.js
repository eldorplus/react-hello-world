const strategies = {
  facebook: require('./facebook'),
  github: require('./github'),
  google: require('./google'),
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

module.exports.saver = (user, done) => {
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
};

module.exports.unlinker = (user, provider, done) => {
  user[provider] = undefined;
  user.save((err) => {
    if (err) done({error: err});
    done({redirect: '/'})
  })
};
