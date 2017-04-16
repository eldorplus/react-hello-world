const config = require('./../config');

module.exports = (req, res, status, error) => {
  config.logger.log('the error', error);
  if (req.headers.accept.indexOf('json') !== -1 || req.headers.accept.indexOf('javascript') !== -1) {
    res.status(status).json(error);
  } else if (req.headers.accept.indexOf('xml') !== -1 && req.headers.accept.indexOf('html') === -1) {
    const easyxml = require('easyxml');
    res.status(status).header('Content-Type', 'text/xml').send(new easyxml({}).render(error));
  } else {
    res.status(status).render('error', error);
  }
};
