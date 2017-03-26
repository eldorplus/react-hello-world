const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// const MemoryStore = require('session-memory-store')(expressSession);

const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./config');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../../static')));

if (config.env !== 'production') {
  app.use(express.static(path.join(__dirname, '../../coverage')));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser(config.session.secret));
app.use(session({
  secret: config.session.secret,
  // store: new RedisStore(config.redis),
  resave: true,
  saveUninitialized: false,
  // rolling: true,
}));

mongoose.connect(config.mongo.uri, config.mongo.auth, (err) => {
  if (err) config.logger.error(`failed to connect to MongoDB with config ${JSON.stringify(config.mongo)}`); // eslint-disable-line no-console
  else config.logger.info(`succesfully connected to MongoDB database ${config.mongo.uri}`); // eslint-disable-line no-console
});

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

app.use('/', require('./routes')(config, passport, require('./auth/roles')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = {success: false, error: {status: 404, message: 'Not Found'}};
  if (req.headers.accept.indexOf('json') !== -1 || req.headers.accept.indexOf('javascript') !== -1) {
    res.status(404).json(error);
  } else if (req.headers.accept.indexOf('xml') !== -1 && req.headers.accept.indexOf('html') === -1) {
    const easyxml = require('easyxml');
    res.status(404).header('Content-Type', 'text/xml').send(new easyxml({}).render(error));
  } else if (req.headers.accept.indexOf('plain') !== -1) {
    res.status(404).header('Content-Type', 'text/plain').send('Error 404\nNot Found');
  } else {
    res.status(404).render('error', error);
  }
  next()
});

// development error handler, show stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    config.logger.error(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler, no stacktrace
app.use(function(err, req, res, next) {
  config.logger.error(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
