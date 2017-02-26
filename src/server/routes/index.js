const router = require('express').Router();
const config = require('./../config');
// const User = require('./../models/User');

router.get('/', (req, res) => {
  let data = {};
  data[`${config.name}`] = { version: config.version, env: config.env };
  res.json(data);
});

module.exports = router;
