const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const router = require('express').Router();
const config = require('./../config');
// const User = require('./../models/User');

router.get('/version', (req, res) => {
  const data = {};
  data[`${config.name}`] = {
    version: config.version,
    env: config.env,
  };
  if (config.env !== 'production') {
    fs.readdir(path.join(__dirname, './../../../coverage'), (err, dirs) => {
      data[`${config.name}`].coverage = _
        .pull(dirs, 'clover.xml', 'coverage-final.json', 'lcov.info')
        .map((dir) => {
          return `http://${config.host}:${config.port}/${dir}/`;
        });
      res.json(data);
    });
  } else {
    res.json(data);
  }
});

module.exports = router;
