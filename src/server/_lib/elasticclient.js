'use strict';

const elasticsearch = require('elasticsearch');
const config = require('../config/environment');

const logger = config.logger;
const clients = {};

const connect = function (opts) {
  const options = Object.assign({}, opts);
  const host = options.host || config.elasticsearch.host;
  // TODO: add more checking here
  if (clients[host]) return clients[host];

  const client = new elasticsearch.Client({
    host,
    log: 'info',
  });
  clients[host] = client;

  // check elastic search
  client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: Infinity,

    // undocumented params are appended to the query string
    hello: 'elasticsearch!',
  }, (error) => {
    if (error) {
      logger.error('elasticsearch cluster is down!');
    } else {
      logger.debug('Elasticsearch - All is well');
    }
  });
  return client;
};

module.exports.connect = connect;
