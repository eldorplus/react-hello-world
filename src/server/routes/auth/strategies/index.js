const strategies = {
  google: require('./google'),
};

const isConfigured = strategy => strategy.config;

module.exports = (config, rootUrl) => Object.keys(strategies)
  .map(type => {
    const strategy = strategies[type];
    strategy.config = strategy.getConfig(config);
    strategy.type = type;
    return strategy
  })
  .filter(strategy => isConfigured(strategy));