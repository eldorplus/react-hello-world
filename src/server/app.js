const path = require('path');
const i18n = require("i18n");
const csrf = require('csurf');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// const MemoryStore = require('session-memory-store')(expressSession);
const passport = require('passport');
const config = require('./config');

i18n.configure(config.i18n);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../../static')));

if (config.env !== 'production') {
  app.use(express.static(path.join(__dirname, '../../coverage')));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan(config.morgan.format, { stream: { write: message => config.logger.info(message) }}));

app.use(cookieParser(config.session.secret));
app.use(session({
  secret: config.session.secret,
  // store: new RedisStore(config.redis),
  resave: true,
  saveUninitialized: false,
  // rolling: true,
}));
// app.use(csrf({ cookie: true }));

app.use(function (req, res, next) {
  var lang = req.session.lang;
  if(lang){
    i18n.setLocale(req, lang);
    next();
  }else
    i18n.init(req, res, next);
});

require('./_lib/mongoclient')(config);

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

// const App = require('./../app');
// app.get('/index.html', (req, res) => {
//   const appHtml = ReactDOMServer.renderToString(
//     <App radiumConfig={{userAgent: req.headers['user-agent']}} />,
//   );
//   res.write(indexHTML.replace('<!-- {{app}} -->', appHtml));
//   res.end();
// });
const userRoles = require('./auth/roles');
app.use('/', require('./routes')(config, passport, userRoles));
app.use('/api/1.1/', require('./routes/1.1')(config, passport, userRoles));

// app.use(function (err, req, res, next) {
//   if (err.code !== 'EBADCSRFTOKEN') return next(err);
//
//   // handle CSRF token errors here
//   res.status(403);
//   res.send('form tampered with')
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = {success: false, error: {status: req.t('error.404.Error 404:Error 404'), message: req.t('error.404.Not Found:Not Found')}};
  config.logger.log('the error', error);
  if (req.headers.accept.indexOf('json') !== -1 || req.headers.accept.indexOf('javascript') !== -1) {
    res.status(404).json(error);
  } else if (req.headers.accept.indexOf('xml') !== -1 && req.headers.accept.indexOf('html') === -1) {
    const easyxml = require('easyxml');
    res.status(404).header('Content-Type', 'text/xml').send(new easyxml({}).render(error));
  } else if (req.headers.accept.indexOf('plain') !== -1) {
    res.status(404).header('Content-Type', 'text/plain').send(req.t('error.404.Error 404\nNot Found:Error 404\nNot Found'));
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
