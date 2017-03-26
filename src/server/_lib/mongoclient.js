const mongoose = require('mongoose');

module.exports = (config) => {
  mongoose.connect(config.mongo.uri, config.mongo.auth, (err) => {
    if (err) config.logger.error(`Failed to connect to MongoDB with config ${JSON.stringify(config.mongo)}`); // eslint-disable-line no-console
    else config.logger.info(`Succesfully connected to MongoDB database ${config.mongo.uri}`); // eslint-disable-line no-console
  });
};