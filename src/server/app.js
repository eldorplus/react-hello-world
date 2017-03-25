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
  if (err) console.error(`failed to connect to MongoDB with config ${JSON.stringify(config.mongo)}`); // eslint-disable-line no-console
  else console.info(`succesfully connected to MongoDB database ${config.mongo.uri}`); // eslint-disable-line no-console
});

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

const _ = require('lodash');
var ConnectRoles = require('connect-roles');

var userRole = new ConnectRoles({
  failureHandler: function (req, res, action) {
    // optional function to customise code that runs when
    // user fails authorisation
    var accept = req.headers.accept || '';
    res.status(403);
    if (~accept.indexOf('html')) {
      res.render('access-denied', {action: action});
    } else {
      res.json('Access Denied - You don\'t have permission to: ' + action);
    }
  }
});

//anonymous users can only access the home page
//returning false stops any more rules from being
//considered
userRole.use(function (req, action) {
  if (!req.isAuthenticated()) return action === 'access home page';
});

//moderator users can access private page, but
//they might not be the only ones so we don't return
//false if the user isn't a moderator
userRole.use('access users page', function (req) {
  console.log('current user', req.user);
  if (_.includes(['Manager', 'Admin'], req.user.role)) {
    return true;
  }
});

//admin users can access all pages
userRole.use(function (req) {
  if (req.user.role === 'Admin') {
    return true;
  }
});

app.use('/', require('./routes')(config, passport, require('./auth/roles')));

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
