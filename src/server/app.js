const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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

app.use(cookieParser());
app.use(session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  // store: new MemoryStore(),
  // rolling: true,
}));

mongoose.connect(config.mongo.uri, config.mongo.auth, (err) => {
  if (err) console.error(`failed to connect to MongoDB with config ${JSON.stringify(config.mongo)}`); // eslint-disable-line no-console
  else console.info(`succesfully connected to MongoDB database ${config.mongo.uri}`); // eslint-disable-line no-console
});

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler, show stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler, no stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
