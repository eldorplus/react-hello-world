const redis = require('redis');
const crypto = require('crypto');
const config = require('../config');

const client = config.redis.enabled ? redis.createClient(config.redis.uri):null;

const Promise = require('bluebird');

const isCached = !!client;

if (isCached) {
  Promise.promisifyAll(redis.RedisClient.prototype);
  Promise.promisifyAll(redis.Multi.prototype);

  client.on('ready', function () {
    config.logger.info('RedisCache Ready', config.redis.digest);
  });

  client.on('connect', function () {
    config.logger.info('RedisCache connected to', config.redis.uri);
  });

  client.on('reconnecting', function () {
    config.logger.info('RedisCache re-connecting to', config.redis.uri);
  });

  client.on('error', function (err) {
    config.logger.error('RedisCache', err);
  });

  client.on('end', function () {
    config.logger.info('RedisCache End!');
  });
}

const cache = (data) => {
  if (config.redis.digest && config.secret) {
    return crypto
      .createHmac(config.redis.digest, config.secret)
      .update(data)
      .digest('hex');
  }
  return data;
};

const setExpire = (key, value, expire) => {
  if (isCached) {
    client.set(cache(key), JSON.stringify(value));
    client.expire(cache(key), expire || 60);
  }
};

const getKey = Promise.coroutine(function* (key) {
  if (isCached) {
    return JSON.parse(yield client.getAsync(cache(key)));
  }
  return null;
});

const setShort = (key, value) => {
  if (isCached) {
    setExpire(cache(key), value, config.redis.shortTTL);
  }
};

const setLong = (key, value) => {
  if (isCached) {
    setExpire(cache(key), value, config.redis.longTTL);
  }
};

module.exports = {
  isCached,
  setExpire,
  getKey,
  setShort,
  setLong,
};
